const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  // We'll check for any validation errors and send a error response if validation errors are present
  if (!errors.isEmpty()) {
    return res.json({ success: false, error: errors.array()[0].msg });
  }

  let user;
  // Finding a user matching the given email
  User.findOne({ email: email })
    .then((fetchedUser) => {
      // Sending an error message if user is not found
      if (!fetchedUser) {
        throw new Error("Invalid email or password");
      }
      user = fetchedUser;
      // Comparing the hashed password and entered password
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        throw new Error("Invalid email or password");
      }
      // Setting up a token
      const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });
      // Checking if user is an admin
      if (user.isAdmin) {
        return res.json({ success: true, isAdmin: true, token: token });
      }
      res.json({ success: true, isAdmin: false, token: token });
    })
    .catch((err) => {
      // we'll send a custom error message if one is set, otherwise we'll send a default message.
      if (err.message) {
        return res.json({
          success: false,
          error: err.message,
        });
      }
      res.json({
        success: false,
        error: "Couldn't sign in, please try again later.",
      });
    });
};

exports.postRegister = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  // We'll check for any validation errors and send a error response if validation errors are present
  if (!errors.isEmpty()) {
    return res.json({ success: false, error: errors.array()[0].msg });
  }

  // Hash the user's password
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      // Create a new user with the input data and hashed password
      const newUser = new User({
        email: email,
        password: hashedPassword,
        personalInfo: {
          firstName: firstName,
          lastName: lastName,
        },
      });
      // Save the user in the database
      return newUser.save();
    })
    .then((result) => {
      res.json({ success: true });
    })
    .catch((err) => {
      // we'll send a custom error message if one is set, otherwise we'll send a default message.
      if (err.message) {
        return res.json({
          success: false,
          error: err.message,
        });
      }
      res.json({
        success: false,
        error: "Couldn't sign up, please try again later.",
      });
    });
};
