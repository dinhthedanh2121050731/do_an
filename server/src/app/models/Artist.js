const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoose_delete = require('mongoose-delete');

const Artist = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        role: { type: String },
        imageArtist: { type: String },
        imageAlbum: { type: String },
        genre: { type: String },
        songs: [
            {
                _id: { type: Schema.Types.ObjectId },
                name: { type: String },
                imageSong: { type: String },
                url: { type: String },
                composer: { type: String },
                duration: { type: String },
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
Artist.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, collection_name: true });
module.exports = mongoose.model('Artist', Artist);
