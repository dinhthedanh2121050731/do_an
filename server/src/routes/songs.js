const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const songsController = require("../app/controllers/SongsController");
const upload = require("../middleware/upload");

router.post(
  "/artist/add-song/:artistId",
  authenticateToken,
  upload.single("url"),
  songsController.addSong
);

router.get("/artist/:artistId", songsController.showSongsByArtist);

module.exports = router;
