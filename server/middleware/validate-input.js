const { body } = require("express-validator");

function validateEmail() {
  return body("**.email", "Email address is invalid.")
    .trim()
    .notEmpty()
    .withMessage("Please provide an email address.")
    .isEmail()
    .normalizeEmail();
}

function validatePassword() {
  return body("password", "Password field cannot be empty.")
    .trim()
    .blacklist("<>")
    .notEmpty();
}

function validateAlphaString(field, name) {
  return body(field, `${name} cannot be empty.`)
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage(`${name} is too short.`)
    .isAlpha()
    .withMessage(`${name} can only contain letters.`);
}

function validateTel(field, name) {
  return body(field, `${name} is invalid.`)
    .trim()
    .notEmpty()
    .withMessage(`${name} cannot be empty.`)
    .isLength({ min: 10 })
    .isMobilePhone("any");
}

function validateDate(field, name) {
  return body(field, `${name} is invalid.`)
    .trim()
    .notEmpty()
    .withMessage(`${name} cannot be empty.`)
    .isDate();
}

function validateAddress(field, name) {
  return body(field, `${name} is invalid.`)
    .trim()
    .notEmpty()
    .withMessage(`${name} cannot be empty.`)
    .matches(/^\d+\s*,\s*[a-zA-Z\s]+,\s*[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/);
}

function validateNum(field, name) {
  return body(field, `${name} is invalid.`)
    .trim()
    .notEmpty()
    .withMessage(`${name} cannot be empty.`)
    .isFloat({ min: 1, max: 300 });
}

module.exports = {
  validateEmail,
  validatePassword,
  validateAlphaString,
  validateTel,
  validateDate,
  validateAddress,
  validateNum,
};
