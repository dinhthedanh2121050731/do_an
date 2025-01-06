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
    create(req, res) {}
}
module.exports = new UserController();
