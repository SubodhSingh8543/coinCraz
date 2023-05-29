const express = require("express");
const { UniqueIdModal } = require("../Modals/UniqueIdModals");

const uniqueTimerRoute = express.Router();

let seconds;

const getTime = async () => {
    try {
        let res = await fetch(`http://worldtimeapi.org/api/timezone/Asia/Kolkata`);
        res = await res.json();
        const data = await res.datetime.split("T")[1].split(".")[0].split(":").map(Number);
        const timerId = res.datetime.split("T")[0].split("-").join("") + res.datetime.split("T")[1].split(".")[0].split(":")[0] + Math.floor(data[1] / 3) * 3;
        // console.log(data.join(""));
        const newMinutes = data[1] - Math.floor(data[1] / 3) * 3;
        const newSec = newMinutes * 60 + data[2];
        seconds = 180 - newSec;
        // return (res.unixtime + "") + seconds;
        return timerId;
        // console.log(seconds);
    } catch (error) {
        console.log(error);
    }
}

uniqueTimerRoute.post("/", async (req, res) => {
    let payload = req.body;

    try {
        let result = await new UniqueIdModal(payload);
        result.save();
        res.status(200).send({ "msg": "amount added successfully" });
    } catch (error) {
        res.status(400).send({ "msg": "Some Error" });
        console.log(error.message);
    }
});

uniqueTimerRoute.get("/", async (req, res) => {
    let query = req.query;
    let page = query.page;
    let limit = query.limit;

    if (page && limit) {
        const skip = (page - 1) * limit;

        try {
            let result = await UniqueIdModal.find({userId : query.userId}).skip(skip).limit(limit).sort({ currentTime: -1 });
            let count = await UniqueIdModal.find({userId : query.userId}).count();
            res.status(200).send({data:result,count});
        } catch (error) {
            res.status(400).send({ "msg": "Some Error" });
            console.log(error.message);
        }
    } else {
        const skip = (page - 1) * limit;

        try {
            let result = await UniqueIdModal.find(query).sort({ currentTime: -1 });
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ "msg": "Some Error" });
            console.log(error.message);
        }
    }
});

uniqueTimerRoute.patch("/:id",async (req,res) => {
    const id = req.params.id;
    const payload = req.body;

    try {
        const data = await UniqueIdModal.findByIdAndUpdate(id,payload);
        res.send({"msg":"price updated Successfully"})
    } catch (error) {
        console.log(error);
    }
})

module.exports = { uniqueTimerRoute };