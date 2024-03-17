const express = require("express");
const { UserModel } = require("../Models/UserModel");
const PostModel = require("../Models/PostModel");

const getpost = async (req, res) => {
  try {
    let product = await PostModel.find();
    res.status(200).send({ message: "all products", product });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getposts = async (req, res) => {
  const { likesSort, name, dislikesSort, category } = req.query;
  try {
    if (likesSort && category) {
      if (likesSort === "asc") {
        let product = await PostModel.find({ category }).sort({ likes: 1 });

        return res.status(200).send(product);
      } else if (likesSort === "desc") {
        let product = await PostModel.find({ category }).sort({ likes: -1 });

        return res.status(200).send(product);
      }
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const getPostbyid = async (req, res) => {
  try {
    let post = await PostModel.findById({ _id: req.params.id });
    res.status(200).send({ message: "Post find by id", post });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
  const { title, description, name, image, likes, dislikes, category } =
    req.body;

  try {
    const posts = new PostModel({
      title,
      description,
      name,
      image,
      likes,
      dislikes,
      category,
    });

    await posts.save();

    return res
      .status(201)
      .send({ posts: posts, message: "Posts added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

const deletebyid = async (req, res) => {
  try {
    let post = await PostModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "Delete Successfully By ID" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const updatebyid = async (req, res) => {
  const payload = req.body;
  try {
    let post = await PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      payload
    );
    res.status(200).send({ message: "Update Successfully" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  createPost,
  getPostbyid,
  deletebyid,
  updatebyid,
  getposts,
  getpost,
};
