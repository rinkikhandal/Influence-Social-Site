import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import Post from "../models/post";
import { BadRequest, NotFound } from "../errors";
import path from "path";

const addPost = async (req, res) => {
  const { id } = req.user;

  const imageFile = req.file;

  const { image } = uploadImage(imageFile);
  console.log(image);

  const post = await Post.create({
    ...req.body,
    image,
    user: id,
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "successfully created post",
    data: null,
  });
};

const getUserPosts = async (req, res) => {
  const {
    user: { id: userId },
  } = req;

  let posts = await Post.find({
    user: userId,
    deleted: false,
  })
    .select("_id user title description image likes ")
    .populate("user")
    .sort({ "likes.num": -1 });

  posts = posts.map((post) => {
    if (post.user) {
      return {
        ...post.toObject(),
        user: {
          _id: post.user._id,
          fullName: post.user.fullName,
          initials: post.user.initials,
        },
      };
    } else {
      post.user = "deleted account";
      return post;
    }
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "",
    data: posts,
  });
};

const getPost = async (req, res) => {
  const {
    params: { id: postId },
    user: { id: userId },
    file,
  } = req;

  let post = await Post.findOne({
    _id: postId,
    user: userId,

    deleted: false,
  }).select("_id user title description image likes ");

  return res.status(200).json({
    success: true,
    message: "",
    data: post,
  });
};

const updatePost = async (req, res) => {
  const {
    params: { id: postId },
    user: { id: userId },
    file,
  } = req;

  // console.log("req.body", { ...req.body });

  let toBeUpdated = {};

  if (file) {
    const imageFile = file;
    const { image } = uploadImage(imageFile);
    toBeUpdated = { image };
  }

  const post = await Post.findOneAndUpdate(
    {
      _id: postId,
      user: userId,
      deleted: false,
    },
    { ...req.body, ...toBeUpdated },
    { new: true, runValidators: true }
  );
  if (!post) {
    throw new NotFound("post not found");
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "",
    data: post,
  });
};

const deletePost = async (req, res) => {
  const {
    params: { id: postId },
    user: { id: userId },
  } = req;

  const post = await Post.findOne({ _id: postId, user: userId });
  if (!post) {
    throw new NotFound("post not found");
  }
  post.deleted = true;
  await post.save();

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "successfully deleted post",
    data: null,
  });
};

const likePost = async (req, res) => {
  const {
    params: { postId },
    user: { id: userId },
  } = req;

  // Post to like
  const post = await Post.findOneAndUpdate(
    { _id: postId },
    {
      $addToSet: {
        likes: userId,
      },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "successfully liked post",
    data: post.likes,
  });
};

const unLikePost = async (req, res) => {
  const {
    params: { postId },
    user: { id: userId },
  } = req;

  // Post to like
  const post = await Post.findOneAndUpdate(
    { _id: postId },
    {
      $pull: {
        likes: userId,
      },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "successfully unLiked post",
    data: post.likes,
  });
};

// upload image functionality
const uploadImage = (imageFile) => {
  if (!imageFile) {
    throw new BadRequest("No File Uploaded");
  }
  if (imageFile.mimetype !== "image/jpeg") {
    throw new BadRequest("no image file");
  }
  const maxSize = 1024 * 1024;
  if (imageFile.size > maxSize) {
    throw new BadRequest("please upload image less than 1MB");
  }

  console.log(imageFile);

  return { image: imageFile.path };
};

export {
  addPost,
  updatePost,
  deletePost,
  likePost,
  unLikePost,
  getUserPosts,
  getPost,
};
