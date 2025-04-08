const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypts = require("bcrypt");
const SALT_ROUND = 10;

const User = new Schema({
  googleId: { type: String, sparse: true },
  facebookId: { type: String, sparse: true },
  username: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String },
  avatar: { type: String, sparse: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  favoritePlaylist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  follow: [
    {
      _id: { type: Number },
      name: { type: String },
      role: { type: String },
      imageArtist: { type: String },
      imageProfileArtist: { type: String },
      genre: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
User.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypts.hash(this.password, SALT_ROUND);
  }
  next();
});
module.exports = mongoose.model("User", User);
