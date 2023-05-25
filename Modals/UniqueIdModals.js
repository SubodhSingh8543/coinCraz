const mongoose = require("mongoose");

const uniqueIdSchema = mongoose.Schema({
    uniqueId: String,
    date: String,
    userId: String,
    amount: Number,
    choice: String
},
{
    versionKey: false
});

const UniqueIdModal = mongoose.model("uniquetimeid", uniqueIdSchema);

module.exports = { UniqueIdModal }