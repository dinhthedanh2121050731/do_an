const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../app/models/User');

const verifAdmin = async function (req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).json({ message: 'Token is missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not Admin' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
};
module.exports = verifAdmin;
