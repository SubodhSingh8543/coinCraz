const mongoose = require("mongoose");

const winnerSchema = mongoose.Schema({
    timeId: String,
    uniqueUserId: String,
}, {
    versionKey: false
});

const WinnerModel = mongoose.model("winner", winnerSchema);

module.exports = { WinnerModel }