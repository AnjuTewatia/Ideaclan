const { Router } = require("express");
const {
  createPost,
  getpost,
  getPostbyid,
  deletebyid,
  updatebyid,
  getposts,
} = require("../Controllers/PostController");
const authentication = require("../Middleware/authentication.middleware");

// Create a new router instance
const postRouter = Router();

postRouter.get("/all", getpost);
postRouter.get("/:id", getPostbyid);

postRouter.get("/", getposts);
postRouter.post("/add", authentication, createPost);
postRouter.delete("/:id", deletebyid);
postRouter.patch("/:id", updatebyid);

module.exports = postRouter;
