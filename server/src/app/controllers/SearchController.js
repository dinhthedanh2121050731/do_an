// const User = require('../models/User');
const Artist = require("../models/Artist");
const Song = require("../models/Song");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
require("dotenv").config();
class SearchController {
  async search(req, res) {
    try {
      const { q, limit } = req.query;
      let border = parseInt(limit) || 3;
      border = border >= 6 ? 5 : border;

      if (!q) {
        return res.status(400).json({ error: "Missing search query" });
      }

      const resultsArtist = await Artist.find({
        name: new RegExp(q, "i"),
      }).populate("songs");

      const resultsSong = await Song.find({ name: new RegExp(q, "i") }).limit(
        4
      );
      res
        .status(200)
        .json({ dataArtist: resultsArtist, dataSongs: resultsSong });
    } catch (err) {
      res.status(500).json({ message: "Error artist find", err });
    }
  }
}
module.exports = new SearchController();
