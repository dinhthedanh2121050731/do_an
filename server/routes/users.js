const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth');
const verifyAdmin = require('../middleware/verifyAdmin');

const UserController = require('../app/controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/protected', authentication, UserController.protected);
router.get('/all-user', UserController.show);

module.exports = router;
