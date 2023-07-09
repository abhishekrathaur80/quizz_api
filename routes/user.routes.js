const express = require("express");
const router = express.Router();

const {
  postRegister,
  postLogin,
  getQuizzes,
} = require("../controllers/user.controller");

router.post("/register", async (req, res) => {
  const { password } = req.body;
  await postRegister(req, res);
});

router.post("/login", postLogin);

router.get("/quizzes", getQuizzes);

module.exports = router;
