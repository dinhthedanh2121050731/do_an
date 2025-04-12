const { body } = require("express-validator");

exports.registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username không được để trống")
    .isLength({ min: 3 }),
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password").isLength({ min: 6 }).withMessage("Password phải từ 6 ký tự"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password").notEmpty().withMessage("Password không được để trống"),
];
