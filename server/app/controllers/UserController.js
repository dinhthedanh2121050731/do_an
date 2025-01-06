const User = require('../models/User');
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
    async create(req, res) {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({ username, email, password });
            await newUser.save();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating user', error: err });
        }
    }
}
module.exports = new UserController();
