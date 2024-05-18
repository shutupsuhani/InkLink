//Scribble.js
const mongoose = require("mongoose");


const Scribble = new mongoose.Schema({
  title: { type: String, default: "untitled" },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Scribble", Scribble);
