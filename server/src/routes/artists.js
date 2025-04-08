const express = require("express");
const authenticateToken = require("../middleware/auth");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

const artistsController = require("../app/controllers/ArtistsController");

router.post("/add-artist", verifyAdmin, artistsController.addArtist);
router.put("/update-artist/:id", verifyAdmin, artistsController.updateArtist);
router.delete(
  "/delete-artist/:id",
  verifyAdmin,
  artistsController.forceDeteted
);
router.delete("/destroy-artist/:id", verifyAdmin, artistsController.destroy);
router.get("/rapper", artistsController.showRapper);
router.get("/get-artist-popular/:id", artistsController.getArtistPopular);
router.get("/singer", artistsController.showSinger);
router.get("/random-artists", artistsController.randomArtist);
router.get("/", artistsController.showArtist);

module.exports = router;
