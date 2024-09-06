const express = require("express");

const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
