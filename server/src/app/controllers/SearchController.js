// const User = require('../models/User');
const Artist = require('../models/Artist');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
class SearchController {
    async search(req, res) {
        try {
            const { q, limit } = req.query;
            let border = parseInt(limit) || 3;
            border = border >= 6 ? 5 : border;

            if (!q) {
                return res.status(400).json({ error: 'Missing search query' });
            }
            const resultsArtist = await Artist.find({ name: new RegExp(q, 'i') });
            const resultsSong = await Artist.aggregate([
                { $unwind: '$songs' },
                { $match: { 'songs.name': { $regex: q, $options: 'i' } } },
                {
                    $project: {
                        _id: 0,
                        name: '$songs.name',
                        url: '$songs.url',
                        image_song: '$songs.imageSong',
                        composer: '$songs.composer',
                        duration: '$songs.duration',
                    },
                },
            ]);

            res.status(200).json({ dataArtist: resultsArtist, dataSongs: resultsSong });
        } catch (err) {
            res.status(500).json({ message: 'Error artist find', err });
        }
    }
}
module.exports = new SearchController();
