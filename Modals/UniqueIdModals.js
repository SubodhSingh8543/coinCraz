const mongoose = require("mongoose");

const uniqueIdSchema = mongoose.Schema({
    uniqueId:Number,
    date:String
},
{
    versionKey: false
});

const UniqueIdModal = mongoose.model("uniquetimeid",uniqueIdSchema);

module.exports = {UniqueIdModal};