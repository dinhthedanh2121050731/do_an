const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (req.user) {
        return res.json({ user: req.user }); // Nếu login Google/Facebook
    }

    if (!token) {
        return res.status(403).json({ message: 'Token is missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token is invalid' });
    }
};
module.exports = authenticateToken;
