require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
const port = 8080;
const uri = "mongodb://localhost:27017/fitcore";
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(multer({ storage: fileStorage }).single("profileImage"));
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);

mongoose
  .connect(uri)
  .then((result) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
