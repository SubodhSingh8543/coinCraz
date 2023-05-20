const mongoose = require("mongoose");

const amountSchema = mongoose.Schema({
    currentAmount: Number,
},
{
    versionKey: false,
});

const AmountModal = mongoose.model("useramount", amountSchema);

module.exports = { AmountModal };