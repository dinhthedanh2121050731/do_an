const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const songsController = require("../app/controllers/SongsController");

router.post(
  "/artist/add-song/:artistId",
  authenticateToken,
  songsController.addSong
);

router.get("/artist/:artistId", songsController.showSongsByArtist);

module.exports = router;
