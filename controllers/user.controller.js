const { userService } = require("../services/user.service");
const { comparePasswords } = require("../utils/bcrypt");

const postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw {
        message: "Email and password required",
        status: 400,
      };
    } else {
      const exists = await userService.find(email);
      if (exists)
        throw {
          message: "Email already exists",
          status: 409,
        };
      const user = await userService.rgister(email, password);
      res.json(user);
    }
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.find(email);
    if (user) {
      if (comparePasswords(password, user.password)) res.status(200).json(user);
      else {
        res.status(401).json({
          message: "Invaid credentials",
          status: 409,
        });
      }
    }
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const getQuizzes = async (req, res) => {
  try {
    const { email } = req.query;
    const quizzes = await userService.findQuizzes(email);
    res.json(quizzes);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { postRegister, postLogin, getQuizzes };
