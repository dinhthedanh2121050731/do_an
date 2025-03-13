const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
class UserController {
    async show(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error getting users', error: err });
        }
    }
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email alrealy existing' });
            }
            const newUser = new User({ username, email, password });
            await newUser.save();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating user', error: err });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Password inValid' });
            }
            const access_token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    password: user.password,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' },
            );
            res.status(200).json({ message: 'Success', access_token, user: user });
        } catch (err) {
            res.status(500).json({ message: 'Error creating user', error: err });
        }
    }
    async protected(req, res) {
        const user = await User.findById(req.user.id);
        console.log(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'This is protected', user: user });
    }
    async getAdmin(req, res) {
        const user = await User.findById(req.user.id);
        console.log(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'This is admin', user: user });
    }
}
module.exports = new UserController();
