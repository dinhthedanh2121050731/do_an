const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');

router.post('/create-user', UserController.create);
router.get('/all-user', UserController.show);

module.exports = router;
