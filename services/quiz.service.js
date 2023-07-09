const Quizzes = require("../models/quiz.model");

const getResponses = async (quizId) => {
  const quiz = await Quizzes.findOne({ _id: quizId });
  return {
    createdBy: quiz.createdBy,
    responseDetails: quiz.responsesDetails,
  };
};
const addResponse = async (quizId, payload) => {
  await Quizzes.findOneAndUpdate(
    { _id: quizId },
    {
      $push: {
        responsesDetails: payload,
      },
      $inc: {
        responses: 1,
      },
    }
  );
  return;
};
const deleteQuizById = async (id) => {
  await Quizzes.findOneAndDelete({ _id: id });
  return;
};
const updateQuizById = async (id, questions, quizName) => {
  const updatedQuiz = await Quizzes.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        questions: questions,
        quizName: quizName,
        updatedAt: new Date().toISOString(),
        numberOfQuestions: questions.length,
      },
    }
  );
  return updatedQuiz;
};
const findOne = async (id) => {
  const quiz = await Quizzes.findById(id);
  return quiz;
};
const quizMetaData = async (email) => {
  const quizzes = await Quizzes.find({ createdBy: email });
  const result = [];
  for (let i = 0; i < quizzes.length; i++) {
    const {
      numberOfQuestions,
      responses,
      quizName,
      createdAt,
      updatedAt,
      _id,
    } = quizzes[i];
    result.push({
      questions: numberOfQuestions,
      responses,
      quizName,
      _id,
      createdAt: createdAt.toDateString(),
      updatedAt: updatedAt.toDateString(),
    });
  }
  return result;
};

module.exports = {
  quizMetaData,
  findOne,
  updateQuizById,
  deleteQuizById,
  addResponse,
  getResponses,
};
