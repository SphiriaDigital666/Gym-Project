const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8080;
const uri = "mongodb://localhost:27017/";

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
  const email = req.body.email;
  if (email === "admin@admin.com") {
    return res.json({ success: true, isAdmin: true });
  }
  res.json({ success: true, isAdmin: false });
});
app.post("/register", (req, res, next) => {
  console.log(req.body);
  res.json({ success: true });
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
