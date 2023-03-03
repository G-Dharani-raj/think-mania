const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
	try {
		let connect = await mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to DB");
	} catch (error) {
		console.log("Error connecting to DB: " + error);
	}
};

module.exports = connectDB;
