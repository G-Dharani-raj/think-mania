const express = require("express");
const mongoose = require("mongoose");
const MovieModel = require("../models/MovieMode.model");

const movieRouter = express.Router();

movieRouter.get("/getmovies", async (req, res) => {
	try {
		let data = await MovieModel.aggregate([{ $sample: { size: 1 } }]);
		res.send(data);
	} catch (error) {}
});

movieRouter.post("/addmovie", async (req, res) => {
	try {
		let movie = new MovieModel(req.body);
		await movie.save();
		res.status(200).send("movie added successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

movieRouter.get("/singleplayer", async (req, res) => {
	try {
		let data = await MovieModel.aggregate([{ $sample: { size: 10 } }]);
		res.status(200).send(data);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = movieRouter;
