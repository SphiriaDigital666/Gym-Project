const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  personalInfo: {
    profilePic: String,
    firstName: String,
    lastName: String,
    tel: String,
    DOB: Date,
    gender: String,
    addressOne: String,
    addressTwo: String,
    currentWeight: Number,
    height: Number,
    goalWeight: Number,
    currentJob: String,
  },
  emergencyInfo: {
    emergencyFirstName: String,
    emergencyLastName: String,
    emergencyRelationship: String,
    emergencyTel: String,
  },
  medicalInfo: { isAllergic: Boolean, allergyDetails: String },
  membershipInfo: {
    membershipType: String,
    planType: String,
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
    startDate: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
