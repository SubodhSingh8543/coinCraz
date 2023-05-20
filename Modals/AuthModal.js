const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
   name: String,
   email: String,
   userId: String,
   creationTime: String,
   lastSignInTime: String,
   amount:Number
},{
   versionKey: false
});

const AuthModal = mongoose.model("user", authSchema);

module.exports = { AuthModal };