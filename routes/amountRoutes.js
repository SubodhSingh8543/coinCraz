const express = require("express");
const { AmountModal } = require("../Modals/AmountModal");

const amountRouter = express.Router();

amountRouter.post("/amount", async (req,res) => {
    const payload = req.body;

    try {
        const data = await new AmountModal(payload);
        data.save();
        data.status(200).send({"msg":"amount added successfully"});
    } catch (error) {
        console.log(error);
        data.status(200).send({"msg":"Some error occured"});
    }
});

amountRouter.get("/amount", async (req,res) => {
    const payload = req.body;

    try {
        const data = await new AmountModal(payload);
        data.save();
        data.status(200).send({"msg":"amount added successfully"});
    } catch (error) {
        console.log(error);
        data.status(200).send({"msg":"Some error occured"});
    }
});