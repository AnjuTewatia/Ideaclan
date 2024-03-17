const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  name: String,
  likes: Number,
  dislikes: Number,
  category: String,
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
