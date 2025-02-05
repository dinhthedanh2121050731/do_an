const Artist = require('../models/Artist');
class HomeController {
    async showArtist(req, res) {
        try {
            const artist = await Artist.find();
            res.status(200).json(artist);
        } catch (err) {
            res.status(500).json({ message: 'Error creating artist', err });
        }
    }
    async showRapper(req, res) {
        try {
            const artist = await Artist.find({ genre: 'Rapper' });
            res.status(200).json(artist);
        } catch (err) {
            res.status(500).json({ message: 'Error creating artist', err });
        }
    }
    async showSinger(req, res) {
        try {
            const artist = await Artist.find({ genre: 'Singer' });
            res.status(200).json(artist);
        } catch (err) {
            res.status(500).json({ message: 'Error creating artist', err });
        }
    }
    async addArtist(req, res) {
        try {
            const { artist, image_artist, name, genre } = req.body;
            const hadArtist = await Artist.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
            if (hadArtist) {
                return res.status(400).json({ message: 'Artist already exists' }); // Return error if artist already exists in the database.  // Note: This is a basic example, in a real-world scenario you might want to handle this differently.  // For example, you might want to update the existing artist instead of creating a new one.  // Also, you might want to sanitize the input data to prevent potential security vulnerabilities.  // You should also add more validation checks depending on your specific requirements.  // You should also consider using a database transaction to ensure data integrity in case of errors.  // You should also consider using a validation library like Joi for input validation.  // You should also consider using a rate limiting middleware to prevent abuse.  // You should also consider using a middleware for authentication and authorization.  // You should also consider using a middleware for logging and auditing.  // You should also consider using a middleware for
            }
            const newArtist = new Artist({
                artist,
                image_artist,
                name,
                genre,
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
    async updateArtist(req, res) {
        try {
            const { id } = req.params;
            const { artist, image_artist, name, genre } = req.body;
            const updatedArtist = await Artist.updateOne({ _id: id }, { artist, image_artist, name, genre });
            res.status(200).json({ message: 'Artist updated successfully', artist: updatedArtist });
        } catch (err) {
            res.status(500).json({ message: 'Error updating artist', err });
        }
    }
    async forceDeteted(req, res) {
        try {
            const { id } = req.params;
            const deletedArtist = await Artist.delete({ _id: id });
            res.status(200).json({ message: 'Artist deleted successfully', artist: deletedArtist });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting artist', err });
        }
    }
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const deletedArtist = await Artist.deleteOne({ _id: id });
            res.status(200).json({ message: 'Artist deleted successfully', artist: deletedArtist });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting artist', err });
        }
    }
}
module.exports = new HomeController();
