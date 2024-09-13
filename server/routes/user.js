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
  validateTextArea,
  validateRadio,
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
    validateGender(),
    validateAddress("personalInfo.addressOne", "Street address"),
    validateStreetAddress2(),
    validateNum("personalInfo.currentWeight", "Current weight"),
    validateNum("personalInfo.height", "Height"),
    validateGoalWeight(),
    validateAlphaString("personalInfo.currentJob", "Job title"),
    validateAlphaString(
      "emergencyInfo.emergencyFirstName",
      "Emergency first name"
    ),
    validateAlphaString(
      "emergencyInfo.emergencyLastName",
      "Emergency last name"
    ),
    validateAlphaString(
      "emergencyInfo.emergencyRelationship",
      "Emergency relationship"
    ),
    validateTel("emergencyInfo.emergencyTel", "Emergency phone number"),
    isAllergic(),
    validateTextArea("medicalInfo.allergyDetails", "Medical details"),
    validateMembershipType(),
    validatePlanType(),
    validatetrainer(),
    validateStartDate(),
  ],
  userController.postRegistration
);

router.get("/profile", verifyTokenMiddleware, userController.getProfile);

module.exports = router;

function validateDOB() {
  return validateDate("personalInfo.DOB", "Date of Birth").isBefore(calDOB());
}

function validateGender() {
  return validateAlphaString("personalInfo.gender", "Gender").custom(
    (value) => {
      if (value !== "male" && value !== "female") {
        throw new Error("Gender is invalid");
      }
      return true;
    }
  );
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

function isAllergic() {
  return validateRadio("medicalInfo.isAllergic", "Medical condition").isBoolean(
    { loose: false }
  );
}

function validateMembershipType() {
  return validateRadio(
    "membershipInfo.membershipType",
    "Membership type"
  ).custom((value) => {
    if (value !== "monthly" && value !== "annual") {
      throw new Error("Membership type is invalid");
    }
    return true;
  });
}

function validatePlanType() {
  return validateRadio("membershipInfo.planType", "Plan type").custom(
    (value) => {
      if (value !== "standard" && value !== "premium" && value !== "platinum") {
        throw new Error("Plan type is invalid");
      }
      return true;
    }
  );
}

function validatetrainer() {
  return validateRadio("membershipInfo.trainer", "Trainer").custom((value) => {
    if (
      value !== "Kevin Dias" &&
      value !== "Brian Domi" &&
      value !== "Shene Lofi" &&
      value !== "Alex Guvi"
    ) {
      throw new Error("Trainer is invalid");
    }
    return true;
  });
}

function validateStartDate() {
  return validateDate("membershipInfo.startDate", "Start date").isAfter(
    calDate()
  );
}
