const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	score: { type: Number, required: true, default: 0 },
	expireAt: { type: Date, expires: "3600", default: Date.now },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
