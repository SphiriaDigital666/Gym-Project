const { body } = require("express-validator");

const User = require("../models/user");

function validateLoginEmail() {
  return body("email", "Email address is invalid.")
    .trim()
    .notEmpty()
    .withMessage("Please provide an email address.")
    .isEmail()
    .normalizeEmail();
}

function validateLoginPassword() {
  return body("password", "Password field cannot be empty.")
    .trim()
    .blacklist("<>")
    .notEmpty();
}

function validateRegisterFirstName() {
  return body("firstName", "First name cannot be empty.")
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage("First name can only contain letters");
}

function validateRegisterLastName() {
  return body("lastName", "Last name cannot be empty.")
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage("Last name can only contain letters");
}

function validateRegisterEmail() {
  return body("email", "Email address is invalid.")
    .trim()
    .notEmpty()
    .withMessage("Please provide an email address.")
    .isEmail()
    .normalizeEmail()
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use.");
        }
      })
    );
}

function validateRegisterPassword() {
  return body("password", "Password cannot be empty.")
    .trim()
    .blacklist("<>")
    .notEmpty()
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

module.exports = {
  validateLoginEmail,
  validateLoginPassword,
  validateRegisterFirstName,
  validateRegisterLastName,
  validateRegisterEmail,
  validateRegisterPassword,
};
