const express = require('express');
const authenticateToken = require('../middleware/auth');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

const artistsController = require('../app/controllers/ArtistsController');

router.post('/add-artist', artistsController.addArtist);
router.post('/add-song/:id', artistsController.addSong);
router.get('/', authenticateToken, verifyAdmin, artistsController.showSong);

module.exports = router;
