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

uniqueTimerRoute.get("/", async (req, res) => {
    try {
        const dateTime = await getTime();
        if (dateTime) {
            const result = await UniqueIdModal.find({ uniqueId: dateTime });
            if (result[0]) {
                res.status(200).send(result);
            } else {
                const data = await new UniqueIdModal({ uniqueId: dateTime });
                data.save();
                const newresult = await UniqueIdModal.find({ uniqueId: dateTime });
                res.status(200).send(newresult);
            }
        }else{
            res.status(400).send({ "msg": "Time does not exists" });
        }

    } catch (error) {
        res.status(400).send({ "msg": "Some Error" });
        console.log(error);
    }
});

module.exports = { uniqueTimerRoute };