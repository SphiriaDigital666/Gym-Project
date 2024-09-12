const express = require("express");

const router = express.Router();
const verifyTokenMiddleware = require("../middleware/verify-token");
const userController = require("../controllers/user");

router.get(
  "/registration",
  verifyTokenMiddleware,
  userController.getRegistration
);
router.post(
  "/registration",
  verifyTokenMiddleware,
  userController.postRegistration
);

router.get("/profile", verifyTokenMiddleware, userController.getProfile);

module.exports = router;
