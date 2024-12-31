exports.calDOB = () => {
  const DOB = new Date();
  DOB.setFullYear(DOB.getFullYear() - 10);
  DOB.setDate(DOB.getDate() + 1);

  const year = DOB.getFullYear();
  const month = String(DOB.getMonth() + 1).padStart(2, "0");
  const day = String(DOB.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

exports.calDate = () => {
  const DOB = new Date();

  const year = DOB.getFullYear();
  const month = String(DOB.getMonth() + 1).padStart(2, "0");
  const day = String(DOB.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
