import Post from "../models/post";
import { StatusCodes } from "http-status-codes";

const getAllPosts = async (req, res) => {
  let allPosts = await Post.find({ deleted: false })
    .select("_id user title description image likes ")
    .populate("user")
    .sort({ "likes.num": -1 });

  allPosts = allPosts.map((post) => {
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
    data: allPosts,
  });
};

export { getAllPosts };
