const express = require("express");
const { WinnerModel } = require("../Modals/FindWinnerModal");

const winnerRoute = express.Router();

winnerRoute.post("/", async (req, res) => {
    const payload = req.body;

    let newData = await WinnerModel.find(payload);
    try {
        if (newData.length === 0) {
            const data = await new WinnerModel(payload);
            data.save();
            res.status(200).send({ "msg": "winner added successfully" });
        }
    } catch (error) {
        res.status(400).send({ "msg": "Some Error" });
        console.log(error.message);
    }
});

winnerRoute.get("/:id", async (req, res) => {
    // const payload = req.body;
    const id = req.params.id;

    try {
        let newData = await WinnerModel.find({ timeId: id });
        res.status(200).send(newData);
    } catch (error) {
        res.status(400).send({ "msg": "Some Error" });
        console.log(error.message);
    }
})

module.exports = { winnerRoute };