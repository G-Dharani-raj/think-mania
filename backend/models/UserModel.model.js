const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	score: { type: Number, required: true, default: 0 },
	createdAt: { type: Date, expires: "2m", default: Date.now },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
