const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
	name: { type: String, required: true },
	emojis: { type: String, required: true },
	difficulty: { type: String, default: "easy" },
});

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;
