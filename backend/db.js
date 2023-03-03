const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
	try {
		let connect = await mongoose.connect(
			"mongodb+srv://dharani:dharani@cluster0.de4bf9a.mongodb.net/users?retryWrites=true&w=majority"
		);
		console.log("Connected to DB");
	} catch (error) {
		console.log("Error connecting to DB: " + error);
	}
};

module.exports = connectDB;
