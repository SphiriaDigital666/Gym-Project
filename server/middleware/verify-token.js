const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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

  // Is token is valid, we'll append the email to the body and call the next middleware
  req.body.email = email;
  next();
};
