const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user.routes");
const quizRoutes = require("./routes/quiz.routes");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log(`Successfully connected to the database...`);
  })
  .catch((err) => {
    console.log(`Failed to connect to the database`);
  });

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);

app.listen(3000, () => console.log("Listening on PORT 3000"));
