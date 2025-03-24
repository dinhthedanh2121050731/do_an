const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = function (req, res, next) {
    try {
        if (req.user) {
            return next(); // Nếu login Google/Facebook
        }
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).json({ message: 'Token is missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token is invalid' });
    }
};
module.exports = authenticateToken;
