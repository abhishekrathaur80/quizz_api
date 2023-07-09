const Quizzes = require("../models/quiz.model");
const { quizService } = require("./quiz.service");
const User = require("../models/user.model");
const { encryptPassword } = require("../utils/bcrypt");

const findQuizzes = async (email) => {
  const quizzes = await quizService.quizMetaData(email);
  return quizzes;
};

const createNewQuiz = async (quizData) => {
  try {
    const { createdBy } = quizData;
    const newQuiz = await Quizzes.create(quizData);
    await User.findOneAndUpdate(
      { email: createdBy },
      {
        $push: {
          quizzes: newQuiz._id.toString(),
        },
      }
    );
    return newQuiz;
  } catch (error) {
    console.log(error);
  }
};
const find = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) return user;
    return user;
  } catch (error) {
    throw error;
  }
};

const register = async (email, password) => {
  try {
    const hashedPassword = encryptPassword(password);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { find, register, findQuizzes, createNewQuiz };
