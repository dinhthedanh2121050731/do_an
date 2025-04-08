const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Song = new Schema({
  name: { type: String, required: true },
  imageSong: { type: String },
  url: { type: String },
  composer: { type: String },
  duration: { type: String },
  artistId: { type: Number, ref: "Artist" }, // Liên kết với Artist
  favoriteBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Song", Song);
