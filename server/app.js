const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
const port = 8080;
const uri = "mongodb://localhost:27017/fitcore";

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.post("/contact", (req, res, next) => {
  console.log(req.body);
  res.json({ success: true });
});
app.post("/login", (req, res, next) => {
  console.log(req.body);
  // const email = req.body.email;
  // if (email === "admin@admin.com") {
  //   return res.json({ success: true, isAdmin: true });
  // }
  // res.json({ success: true, isAdmin: false });
  res.json({ success: false, error: "Login failed" });
});
app.post("/register", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    return res.json({ success: false, error: "Passwords must match" });
  }

  const user = new User({
    email: email,
    password: password,
    personalInfo: {
      firstName: firstName,
      lastName: lastName,
    },
  });

  user
    .save()
    .then((result) => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, error: "Couldn't sign up" });
    });
});
app.post("/registration", (req, res, next) => {
  console.log(req.body);
  res.json({ success: true });
});

mongoose
  .connect(uri)
  .then((result) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
