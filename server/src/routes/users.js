const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");
const verifyAdmin = require("../middleware/verifyAdmin");

const UserController = require("../app/controllers/UserController");
const passport = require("passport");

// [Post] /register
router.post("/register", UserController.register);
// [Post] /login
router.post("/login", UserController.login);
// [Post] /add-favortite-song
router.post(
  "/add-favorite-song",
  authentication,
  UserController.addFavoriteSong
);
// [Post] /add-follow
router.post("/add-follow", authentication, UserController.addFollow);

// [Get] /logout
router.get("/logout", UserController.logout);
// [Get] /me
router.get("/me", authentication, UserController.me);
// [Get] /getAdmin
router.get("/getAdmin", verifyAdmin, UserController.getAdmin);
// [Get] /all-user
router.get("/all-user", UserController.show);
// [Get] /favorite-song
router.get("/favorite-song", authentication, UserController.showFavoriteSong);
// [Get] /follow
router.get("/follow", authentication, UserController.showFollow);
// [Get] Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001",
    failureRedirect: "http://localhost:3001/login",
  })
);
// [Get] Facebook Auth
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3001",
    failureRedirect: "http://localhost:3001/login",
  })
);
// [Delete] /delete-follow
router.delete(
  "/delete-follow/:id",
  authentication,
  UserController.deleteFollow
);

module.exports = router;
