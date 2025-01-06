const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.post('/', homeController.index);

module.exports = router;
