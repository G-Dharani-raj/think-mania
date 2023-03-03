const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel.model");

const userRouter = express.Router();

userRouter.post("/checkname", async (req, res) => {
	const { name } = req.body;
	// console.log(name);
	try {
		let user = await UserModel.find({ name });
		// console.log(user);
		if (user.length > 0) {
			res.status(403).send("User already exists");
		} else {
			let newUser = new UserModel(req.body);
			await newUser.save();
			res.status(200).send("Name is available");
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

userRouter.post("/adddetails", async (req, res) => {
	const { name, score } = req.body;
	try {
		let user = await UserModel.find({ name });
		if (user.length > 0) {
			let user = await UserModel.findOneAndUpdate(
				{ name: req.body.username },
				{ score: req.body.score }
			);
			res.status(200).send("User score updated successfully");
		} else {
			let newUser = new UserModel(req.body);
			await newUser.save();
			res.status(200).send("User saved successfully");
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = userRouter;
