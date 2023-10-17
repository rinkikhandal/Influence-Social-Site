import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import Post from "../models/post";
import { BadRequest, NotFound } from "../errors";
import axios from "axios";

const addPost = async (req, res) => {
  const { id } = req.user;

  // console.log(req.body, req.file);

  // console.log(req.file);
  const imageFile = req.file;
  // Extract the file name from the originalname property
  const fileName = imageFile.originalname;
  // console.log(fileName);
  const fileData = imageFile.buffer;
  // console.log(fileData);

  const uploadIoResponse = await axios.post(
    `https://api.upload.io/v2/accounts/${process.env.UPLOAD_IO_ACCOUNT_ID}/uploads/binary`,
    fileData,
    {
      headers: {
        Authorization: `Bearer ${process.env.UPLOAD_IO_API_KEY}`,
        // "Content-Type": "application/octet-stream",
        // "Content-Disposition": `filename=${encodeURIComponent(fileName)}`,
      },
    }
  );
  console.log(uploadIoResponse.data.fileUrl);

  const post = await Post.create({
    ...req.body,
    image: uploadIoResponse.data.fileUrl,
    user: id,
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "successfully created post",
    data: null,
  });
};

const getPost = async (req, res) => {
  const {
    params: { id: postId },
    user: { id: userId },
  } = req;

  const post = await Post.findOne({
    _id: postId,
    user: userId,
    deleted: false,
  }).select("_id image title description likes");

  if (!post) {
    throw new NotFound("post not found");
  }

  return res.status(StatusCodes.OK).json({
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
    const fileData = imageFile.buffer;
    // Extract the file name from the originalname property
    const fileName = imageFile.originalname;
    // console.log(fileData);

    const uploadIoResponse = await axios.post(
      `https://api.upload.io/v2/accounts/${process.env.UPLOAD_IO_ACCOUNT_ID}/uploads/binary`,
      fileData,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPLOAD_IO_API_KEY}`,
          // "Content-Type": "application/octet-stream",
          // "Content-Disposition": `filename=${encodeURIComponent(fileName)}`,
        },
      }
    );
    toBeUpdated = { image: uploadIoResponse.data.fileUrl };
  }
  // console.log(uploadIoResponse.data.fileUrl);

  const post = await Post.findOneAndUpdate(
    {
      _id: postId,
      user: userId,
      deleted: false,
    },
    { ...req.body, ...toBeUpdated },
    { new: true, runValidators: true }
  );
  // .select("_id image title description likes")
  if (!post) {
    throw new NotFound("post not found");
  }

  // console.log("from backend", post);

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

export { addPost, updatePost, deletePost, likePost, unLikePost, getPost };
