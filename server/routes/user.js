const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/user");

router.get("/registration", userController.getRegistration);

router.post("/registration", userController.postRegistration);

router.get("/profile", userController.getProfile);

module.exports = router;
