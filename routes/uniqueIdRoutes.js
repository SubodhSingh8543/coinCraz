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
        // let result = await UniqueIdModal.insertOne(payload);
        result.save();
        // res.status(200).send("done");
        res.status(200).send({ "msg": "amount added successfully"});
    } catch (error) {
        res.status(400).send({ "msg": "Some Error" });
        console.log(error.message);
    }
});

uniqueTimerRoute.get("/", async (req, res) => {
    let query = req.query;

    try {
        let result = await UniqueIdModal.find(query);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ "msg": "Some Error" });
        console.log(error.message);
    }
});

module.exports = { uniqueTimerRoute };