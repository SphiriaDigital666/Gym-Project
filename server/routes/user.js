const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const verifyTokenMiddleware = require("../middleware/verify-token");
const userController = require("../controllers/user");
const { calDOB, calDate } = require("../util/calculate-date");
const {
  validateAlphaString,
  validateEmail,
  validateTel,
  validateDate,
  validateAddress,
  validateNum,
} = require("../middleware/validate-input");

router.get(
  "/registration",
  verifyTokenMiddleware,
  userController.getRegistration
);

router.post(
  "/registration",
  verifyTokenMiddleware,
  [
    validateAlphaString("personalInfo.firstName", "First name"),
    validateAlphaString("personalInfo.lastName", "Last name"),
    validateEmail(),
    validateTel("personalInfo.tel", "Phone number"),
    validateDOB(),
    validateAddress("personalInfo.addressOne", "Street address"),
    validateStreetAddress2(),
    validateNum("personalInfo.currentWeight", "Current weight"),
    validateNum("personalInfo.height", "Height"),
    validateGoalWeight(),
    validateAlphaString("personalInfo.currentJob", "Job title"),
  ],
  userController.postRegistration
);

router.get("/profile", verifyTokenMiddleware, userController.getProfile);

module.exports = router;

function validateDOB() {
  return validateDate("personalInfo.DOB", "Date of Birth").isBefore(calDOB());
}

function validateStreetAddress2() {
  return body("personalInfo.addressTwo", `Address Line 2 is invalid.`)
    .optional()
    .trim()
    .matches(/^\d+\s*,\s*[a-zA-Z\s]+,\s*[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/);
}

function validateGoalWeight() {
  return validateNum("personalInfo.goalWeight", "Goal weight").custom(
    (value, { req }) => {
      if (value >= req.body.personalInfo.currentWeight) {
        throw new Error("Goal weight must be less that current weight.");
      }
      return true;
    }
  );
}
