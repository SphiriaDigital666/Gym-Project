module.exports = (req, res, next) => {
  req.body.personalInfo = JSON.parse(req.body.personalInfo);
  req.body.emergencyInfo = JSON.parse(req.body.emergencyInfo);
  req.body.medicalInfo = JSON.parse(req.body.medicalInfo);
  req.body.membershipInfo = JSON.parse(req.body.membershipInfo);
  next();
};
