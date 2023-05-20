const express = require("express");
const { AuthModal } = require("../Modals/AuthModal");
const authRoute = express.Router();

authRoute.patch("/", async (req, res) => {
    const payload = req.body;

    let newPayload = {...payload , amount:0}

    try {
        const users = await AuthModal.find({ userId: payload.userId })
        console.log(users);
        console.log(payload);

        if (users.length > 0) {
            let id = users[0]._id
            let obj = {
                lastSignInTime : Date()
            }
            await AuthModal.findByIdAndUpdate(id, obj);
            res.status(200).send({ "msg": "data updated successfully" });
        } else {
            const newData = await new AuthModal(newPayload);
            newData.save();
            res.status(200).send({ "msg": "data added successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ "msg": "error occured" });
    }
});

authRoute.patch("/:id", async (req,res) => {
    const id = req.params.id;
    const payload = req.body;

    try {
        const users = await AuthModal.find({ userId: id })
        let _id = users[0]._id;
        // let prevAmount = payload.amount;
        // console.log(prevAmount);

        const data = await AuthModal.findByIdAndUpdate(_id,payload)
        res.status(200).send({ "msg": "amount added successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ "msg": "error occured" });
    }
});

authRoute.get("/:id", async (req,res) => {
    const id = req.params.id;
    try {
        const data = await AuthModal.find({ userId: id });
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send({ "msg": "error occured" });
    }
})

module.exports = { authRoute };