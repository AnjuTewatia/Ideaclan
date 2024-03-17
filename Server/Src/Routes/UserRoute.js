const { register, login, allusers } = require("../Controllers/UserController");
const { Router } = require("express");

// Create a new router instance
const userRouter = Router();

// Define the route for user registration
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/allusers", allusers);

module.exports = userRouter;
