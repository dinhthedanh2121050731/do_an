const express = require('express');
const authenticateToken = require('../middleware/auth');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

const artistsController = require('../app/controllers/ArtistsController');

router.post('/add-artist', verifyAdmin, artistsController.addArtist);
router.post('/add-song/:id', verifyAdmin, artistsController.addSong);
router.put('/update-artist/:id', verifyAdmin, artistsController.updateArtist);
router.get('/rapper', artistsController.showRapper);
router.get('/singer', artistsController.showSinger);
router.get('/', artistsController.showArtist);

module.exports = router;
