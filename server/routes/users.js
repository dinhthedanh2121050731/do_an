const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth');
const verifyAdmin = require('../middleware/verifyAdmin');

const UserController = require('../app/controllers/UserController');
const passport = require('passport');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/me', UserController.me);
// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login',
    }),
);
// Facebook Auth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login',
    }),
);
router.get('/protected', authentication, UserController.protected);
router.get('/getAdmin', verifyAdmin, UserController.getAdmin);
router.get('/all-user', UserController.show);

module.exports = router;
