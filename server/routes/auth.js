const express = require("express");

const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");
const {
  validateEmail,
  validateAlphaString,
  validatePassword,
} = require("../middleware/validate-input");

router.post(
  "/login",
  [validateEmail(), validatePassword()],
  authController.postLogin
);

router.post(
  "/register",
  [
    validateAlphaString("firstName", "First name"),
    validateAlphaString("lastName", "Last name"),
    validateRegisterEmail(),
    validateRegisterPassword(),
    validateAlphaString("gender", "Gender"),
  ],
  authController.postRegister
);

module.exports = router;

function validateRegisterEmail() {
  return validateEmail().custom((value) =>
    User.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject("Email already in use.");
      }
    })
  );
}

function validateRegisterPassword() {
  return validatePassword()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("WEAK")
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Passwords must match.");
      }
      return true;
    });
}
