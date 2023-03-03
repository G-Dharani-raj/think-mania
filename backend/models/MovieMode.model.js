const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
	name: { type: String, required: true },
	emojis: { type: Array, required: true },
});

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;
