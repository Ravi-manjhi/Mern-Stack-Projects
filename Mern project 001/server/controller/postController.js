import postModel from "../models/postModel.js";
import mongoose from "mongoose";

export const getPost = async (req, res) => {
  try {
    const data = await postModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(503).json({ data: "Failed to Fetch!" });
  }
};

export const createPost = async (req, res) => {
  const postData = req.body;
  const newPost = postModel({
    ...postData,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    newPost
      .save()
      .then((res) => res.status(201).json(newPost))
      .catch((error) => res.status(201).json({ Status: error.message }));
  } catch (error) {
    res.status(502).json({ message: "Failed to create!" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = req.body.data;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Invalid Id" });
  else {
    const updatePost = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(202).json(updatePost);
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid Id" });
  } else {
    await postModel
      .findByIdAndDelete(id)
      .then((response) => res.status(200).json({ response }))
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  }
};

export const likePost = async (req, res) => {
  const id = req.params.id;

  if (!req.userId) return res.status(404).json({ message: "Unautheticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that Id");

  const post = await postModel.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like post
    post.likes.push(req.userId);
  } else {
    // dislike
    post.likes.filter((id) => id !== req.userId);
  }
  const updateLike = await postModel.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(202).json({ message: updateLike });
};
