const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

const comparePasswords = (userEnteredPassword, hashedPassword) => {
  return bcrypt.compare(userEnteredPassword, hashedPassword);
};

module.exports = { encryptPassword, comparePasswords };
