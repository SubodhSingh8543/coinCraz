const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    result: String,
    timeId: String,
    currentTime: String
},{
    versionKey : false
});

const ResultModel = mongoose.model("result",resultSchema);

module.exports = { ResultModel };