const express = require('express');
const router = express.Router();

const artistsController = require('../app/controllers/ArtistsController');

router.post('/add-artist', artistsController.addArtist);
router.post('/add-song/:id', artistsController.addSong);
router.get('/', artistsController.showSong);

module.exports = router;
