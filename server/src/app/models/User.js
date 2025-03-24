const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypts = require('bcrypt');
const SALT_ROUND = 10;

const User = new Schema({
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String },
    avatar: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    favoritePlaylist: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId },
            name: { type: String },
            imageSong: { type: String },
            url: { type: String },
            composer: { type: String },
            duration: { type: String },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
User.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypts.hash(this.password, SALT_ROUND);
    }
    next();
});
module.exports = mongoose.model('User', User);
