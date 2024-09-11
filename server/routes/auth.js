const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
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
});

router.post("/register", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Check whether password and confirmPassword are same
  if (password !== confirmPassword) {
    return res.json({ success: false, error: "Passwords must match" });
  }

  // Can't allow users to create new accounts with emails that are associated with existing accounts
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        throw new Error("Email already taken");
      }
      // Hash the user's password
      return bcrypt.hash(password, 12);
    })
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
});

module.exports = router;

// app.post("/login", (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   let user;

//   // Finding a user matching the given email
//   User.findOne({ email: email })
//     .then((fetchedUser) => {
//       // Sending an error message if user is not found
//       if (!fetchedUser) {
//         throw new Error("Invalid email or password");
//       }
//       user = fetchedUser;
//       // Comparing the hashed password and entered password
//       return bcrypt.compare(password, user.password);
//     })
//     .then((result) => {
//       if (!result) {
//         throw new Error("Invalid email or password");
//       }
//       // Setting up a token
//       const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
//         expiresIn: "1h",
//       });
//       // Checking if user is an admin
//       if (user.isAdmin) {
//         return res.json({ success: true, isAdmin: true, token: token });
//       }
//       res.json({ success: true, isAdmin: false, token: token });
//     })
//     .catch((err) => {
//       // we'll send a custom error message if one is set, otherwise we'll send a default message.
//       if (err.message) {
//         return res.json({
//           success: false,
//           error: err.message,
//         });
//       }
//       res.json({
//         success: false,
//         error: "Couldn't sign in, please try again later.",
//       });
//     });
// });

// app.post("/register", (req, res, next) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const email = req.body.email;
//   const password = req.body.password;
//   const confirmPassword = req.body.confirmPassword;

//   // Check whether password and confirmPassword are same
//   if (password !== confirmPassword) {
//     return res.json({ success: false, error: "Passwords must match" });
//   }

//   // Can't allow users to create new accounts with emails that are associated with existing accounts
//   User.findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         throw new Error("Email already taken");
//       }
//       // Hash the user's password
//       return bcrypt.hash(password, 12);
//     })
//     .then((hashedPassword) => {
//       // Create a new user with the input data and hashed password
//       const newUser = new User({
//         email: email,
//         password: hashedPassword,
//         personalInfo: {
//           firstName: firstName,
//           lastName: lastName,
//         },
//       });
//       // Save the user in the database
//       return newUser.save();
//     })
//     .then((result) => {
//       res.json({ success: true });
//     })
//     .catch((err) => {
//       // we'll send a custom error message if one is set, otherwise we'll send a default message.
//       if (err.message) {
//         return res.json({
//           success: false,
//           error: err.message,
//         });
//       }
//       res.json({
//         success: false,
//         error: "Couldn't sign up, please try again later.",
//       });
//     });
// });
