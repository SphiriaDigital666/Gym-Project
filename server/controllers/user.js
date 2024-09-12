const User = require("../models/user");

exports.getRegistration = (req, res, next) => {
  // Email will be appended to the req body by the verify-token middleware
  const email = req.body.email;

  // We'll fetch data for the email extracted from the token
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new Error("Could not find user");
      }

      const firstName = user.personalInfo.firstName;
      const lastName = user.personalInfo.lastName;

      // We'll send the email, firstName and lastName as a response
      res.json({
        success: true,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
    })
    .catch((err) => {
      // we'll send a custom error message if one is set, otherwise we'll send a default message.
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
};

exports.postRegistration = (req, res, next) => {
  // Email will be appended to the req body by the verify-token middleware
  const email = req.body.email;

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
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: "Couldn't complete registration. Please try again later",
      });
    });
};

exports.getProfile = (req, res, next) => {
  // Email will be appended to the req body by the verify-token middleware
  const email = req.body.email;

  // We'll fetch data for the email extracted from the token
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new Error("Could not find user");
      }

      // Users could view their profile data before filling the registration form
      // In that case we'll send only the full name and email data as a response
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

      // We have to restructure our data
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
      // we'll send a custom error message if one is set, otherwise we'll send a default message.
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
};
