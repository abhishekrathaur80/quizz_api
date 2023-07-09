const express = require("express");
const router = express.Router();

const {
  postCreateQuiz,
  getByQuizId,
  postQuizById,
  deleteQuizById,
  postResponse,
  getResponsesByQuizId,
} = require("../controllers/quiz.controller");

router.post("/create", postCreateQuiz);

router.get("/response/:quizId", getResponsesByQuizId);
router.post("/:quizId/response", postResponse);
router.get("/:quizId", getByQuizId);
router.post("/:quizId", postQuizById);
router.delete("/:quizId", deleteQuizById);

module.exports = router;
