const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Invalid token' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).send({ message: 'Token is not valid' });
    }
};
module.exports = authenticateToken;
