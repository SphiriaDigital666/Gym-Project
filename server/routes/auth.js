const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");
const {
  validateLoginEmail,
  validateLoginPassword,
  validateRegisterFirstName,
  validateRegisterLastName,
  validateRegisterEmail,
  validateRegisterPassword,
} = require("../middleware/validate-auth-input");

router.post(
  "/login",
  [validateLoginEmail(), validateLoginPassword()],
  authController.postLogin
);

router.post(
  "/register",
  [
    validateRegisterFirstName(),
    validateRegisterLastName(),
    validateRegisterEmail(),
    validateRegisterPassword(),
  ],
  authController.postRegister
);

module.exports = router;
