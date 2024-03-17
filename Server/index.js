const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./Src/Config/db");
const userRouter = require("./Src/Routes/UserRoute");
const postRouter = require("./Src/Routes/PostRoute");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

app.use("/post", postRouter);

app.get("/", (req, res) => {
  res.send("welcome to idea clan");
});

app.listen(3000, async (req, res) => {
  try {
    await connect();
    console.log("connected to server");
  } catch (error) {
    console.log(error);
  }

  console.log("server running to post 3000");
});
