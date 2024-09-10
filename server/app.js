require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const app = express();
const port = 8080;
const uri = "mongodb://localhost:27017/fitcore";

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/login", (req, res, next) => {
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

app.post("/register", (req, res, next) => {
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

app.get("/registration", (req, res, next) => {
  // Check whether authorization headers are set
  if (!req.headers.authorization) {
    return res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // Make sure authorization header is valid
  const authFragments = req.headers.authorization.split(" ");
  if (authFragments.length !== 2) {
    return res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // Verify the token
  const authToken = authFragments[1];
  let email;
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    email = decodedToken.email;
    if (!email) {
      throw new Error("User not found.");
    }
  } catch (err) {
    // we'll send a custom error message if one is set, otherwise we'll send a default message.
    if (err.message) {
      return res.json({
        success: false,
        error: err.message,
      });
    }
    res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // We'll fetch data for the email extracted from the token
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new Error("Could not find user");
      }

      const firstName = user.personalInfo.firstName;
      const lastName = user.personalInfo.lastName;

      res.json({
        success: true,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
    })
    .catch((err) => {
      console.log("/registration:GET ", err);
      if (err.message) {
        return res.json({
          success: false,
          error: err.message,
        });
      }
      res.json({
        success: false,
        error: "Couldn't verify user",
      });
    });
});

app.post("/registration", (req, res, next) => {
  // Check whether authorization headers are set
  if (!req.headers.authorization) {
    return res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // Make sure authorization header is valid
  const authFragments = req.headers.authorization.split(" ");
  if (authFragments.length !== 2) {
    return res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // Verify the token
  const authToken = authFragments[1];
  let email;
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    email = decodedToken.email;
    if (!email) {
      throw new Error("User not found.");
    }
  } catch (err) {
    // we'll send a custom error message if one is set, otherwise we'll send a default message.
    if (err.message) {
      return res.json({
        success: false,
        error: err.message,
      });
    }
    res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // const newEmail = req.body.personalInfo.email;
  const personalInfo = {
    profilePic: "",
    firstName: req.body.personalInfo.firstName,
    lastName: req.body.personalInfo.lastName,
    tel: req.body.personalInfo.tel,
    DOB: req.body.personalInfo.DOB,
    gender: req.body.personalInfo.gender,
    addressOne: req.body.personalInfo.addressOne,
    addressTwo: req.body.personalInfo.addressTwo,
    currentWeight: req.body.personalInfo.currentWeight,
    height: req.body.personalInfo.height,
    goalWeight: req.body.personalInfo.goalWeight,
    currentJob: req.body.personalInfo.currentJob,
  };
  const emergencyInfo = req.body.emergencyInfo;
  const medicalInfo = req.body.medicalInfo;
  const membershipInfo = req.body.membershipInfo;

  // Find a user and update the user. We'll update a dummy user until authentication is implemented
  User.findOneAndUpdate(
    { email: email },
    {
      // email: newEmail,
      personalInfo: personalInfo,
      emergencyInfo: emergencyInfo,
      medicalInfo: medicalInfo,
      membershipInfo: membershipInfo,
    }
  )
    .then((result) => {
      console.log(result);
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: "Couldn't complete registration. Please try again later",
      });
    });
});

mongoose
  .connect(uri)
  .then((result) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/profile", (req, res, next) => {
  // Check whether authorization headers are set
  if (!req.headers.authorization) {
    return res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // Make sure authorization header is valid
  const authFragments = req.headers.authorization.split(" ");
  if (authFragments.length !== 2) {
    return res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // Verify the token
  const authToken = authFragments[1];
  let email;
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    email = decodedToken.email;
    if (!email) {
      throw new Error("User not found.");
    }
  } catch (err) {
    // we'll send a custom error message if one is set, otherwise we'll send a default message.
    if (err.message) {
      return res.json({
        success: false,
        error: err.message,
      });
    }
    res.json({
      success: false,
      error: "Couldn't verify user",
    });
  }

  // We'll fetch data for the email extracted from the token
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new Error("Could not find user");
      }

      if (!user.personalInfo.tel) {
        return res.json({
          success: true,
          userInfo: {
            personalInfo: {
              fullName: `${user.personalInfo.firstName} ${user.personalInfo.lastName}`,
              email: user.email,
            },
            emergencyInfo: {},
            medicalInfo: {},
            membershipInfo: {},
          },
        });
      }
      const personalInfo = {
        fullName: `${user.personalInfo.firstName} ${user.personalInfo.lastName}`,
        email: user.email,
        tel: user.personalInfo.tel,
        DOB: user.personalInfo.DOB.toDateString(),
        currentJob: user.personalInfo.currentJob,
        gender: user.personalInfo.gender,
        address: user.personalInfo.addressOne,
        currentWeight: user.personalInfo.currentWeight,
        height: user.personalInfo.height,
        goalWeight: user.personalInfo.goalWeight,
      };
      console.log(personalInfo);

      const emergencyInfo = {
        emergencyFullName: `${user.emergencyInfo.emergencyFirstName} ${user.emergencyInfo.emergencyLastName}`,
        emergencyTel: user.emergencyInfo.emergencyTel,
        emergencyRelationship: user.emergencyInfo.emergencyRelationship,
      };
      const medicalInfo = {
        allergyDetails:
          user.medicalInfo.allergyDetails === ""
            ? "No"
            : user.medicalInfo.allergyDetails,
      };
      const membershipInfo = {
        membershipType: user.membershipInfo.membershipType,
        planType: user.membershipInfo.planType,
        startDate: user.membershipInfo.startDate.toDateString(),
        trainer: user.membershipInfo.trainer,
      };
      res.json({
        success: true,
        userInfo: {
          personalInfo: personalInfo,
          emergencyInfo: emergencyInfo,
          medicalInfo: medicalInfo,
          membershipInfo: membershipInfo,
        },
      });
    })
    .catch((err) => {
      console.log("/profile:GET ", err);
      if (err.message) {
        return res.json({
          success: false,
          error: err.message,
        });
      }
      res.json({
        success: false,
        error: "Couldn't verify user",
      });
    });
});
