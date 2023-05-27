const express = require("express");
const { ResultModel } = require("../Modals/ResultModel");

const resultRoute = express.Router();

resultRoute.post("/", async (req, res) => {
    const payload = req.body;
    let newData = await ResultModel.find({ timeId: payload.timeId });
    try {
        if (newData.length === 0) {
            const data = await new ResultModel(payload);
            data.save();
            res.status(200).send({ "msg": "result added successfully" });
        }
        //  else {
        //     res.status(400).send({ "msg": "Some Error" });
        // }
    } catch (error) {
        res.status(400).send({ "msg": "Some Error" });
        console.log(error.message);
    }
})

module.exports = { resultRoute };