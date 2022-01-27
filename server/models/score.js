const mongoose = require("mongoose");

//define a story schema for the database
const ScoreSchema = new mongoose.Schema({
  user: String,
  score: Number,
});

// compile model from schema
module.exports = mongoose.model("score", ScoreSchema);