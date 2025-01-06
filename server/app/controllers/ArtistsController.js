const Artist = require('../models/Artist');
class HomeController {
    async showSong(req, res) {
        try {
            const artist = await Artist.find();
            res.status(200).json(artist);
        } catch (err) {
            res.status(500).json({ message: 'Error creating artist', err });
        }
    }
    async addArtist(req, res) {
        try {
            const { artist, image_artist } = req.body;
            const newArtist = new Artist({
                artist,
                image_artist,
            });
            await newArtist.save();
            res.status(201).json({ message: 'Artist created successfully', artist: newArtist });
        } catch (err) {
            res.status(500).json({ message: 'Error creating artist', err });
        }
    }
    async addSong(req, res) {
        try {
            const { id } = req.params;
            const { name, image_song, url } = req.body;
            const artist = await Artist.findById(id);
            artist.songs.push({ name, image_song, url });
            await artist.save();
        } catch (err) {
            res.status(500).json({ message: 'Error creating artist', err });
        }
    }
}
module.exports = new HomeController();
