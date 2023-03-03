const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel.model");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
	res.status(200).send("Welcome to Homepage!");
});

userRouter.post("/adddetails", async (req, res) => {
	try {
		let new_user = new UserModel(req.body);
		await new_user.save();
		res.status(200).send("user deatils have been saved successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

userRouter.patch("/updatescore", async (req, res) => {
	try {
		let user = await UserModel.findOneAndUpdate(
			{ name: req.body.username },
			{ score: req.body.score }
		);
	} catch (error) {}
});

module.exports = userRouter;
