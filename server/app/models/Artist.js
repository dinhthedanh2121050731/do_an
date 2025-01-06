const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Artist = new Schema(
    {
        _id: { type: Number },
        artist: { type: String },
        image_artist: { type: String },
        songs: [
            {
                name: { type: String },
                image_song: { type: String },
                url: { type: String },
            },
        ],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        _id: false,
    },
);
Artist.plugin(AutoIncrement);
module.exports = mongoose.model('Artist', Artist);
