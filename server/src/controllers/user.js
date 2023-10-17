import { StatusCodes } from "http-status-codes";
import User from "../models/user";
import Post from "../models/post";
import { NotFound } from "../errors/index";

const getUser = async (req, res) => {
  const { id: userId } = req.params;

  let user = await User.findOne({ _id: userId, deleted: false });

  if (!user) {
    throw new NotFound("user not found");
  }

  let posts = await Post.find({ user: userId, deleted: false })
    .select("_id title image description likes ")
    .populate("user")
    .sort({ "likes.num": -1 });

  posts = posts.map((post) => {
    return {
      ...post.toObject(),
      user: {
        _id: post.user._id,
        fullName: post.user.fullName,
        initials: post.user.initials,
      },
    };
  });
  // console.log(posts);

  user = {
    email: user.email,
    _id: user.id,
    firstName: user.firstName,
    initials: user.initials,
    fullName: user.fullName,
    followers: user.followers,
    following: user.following,
    posts: posts,
  };

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "",
    data: user,
  });
};

const followUser = async (req, res) => {
  const { id } = req.params;
  const userToFollow = await User.findOne({
    _id: id,
    deleted: false,
  })
    .select("_id ")
    .lean();

  const { id: userId } = req.user;
  if (!userToFollow) {
    throw new NotFound("user not found");
  }

  // adding following in the useraccount
  const mainUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $addToSet: {
        following: userToFollow._id,
      },
    },
    { new: true, runValidators: true }
  );

  // adding the followers in the others account
  const followedUser = await User.findOneAndUpdate(
    { _id: userToFollow._id },
    {
      $addToSet: {
        followers: userId,
      },
    },
    { new: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User followed successfully",
    data: {
      mainUserFollowings: mainUser.following,
    },
  });
};

const unFollowUser = async (req, res) => {
  const { id } = req.params;
  const userToUnFollow = await User.findOne({
    _id: id,
    deleted: false,
  })
    .select("_id")
    .lean();

  const { id: userId } = req.user;

  if (!userToUnFollow) {
    throw new NotFound("user not found");
  }

  const mainUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        following: userToUnFollow._id,
      },
    },
    { new: true, runValidators: true }
  );

  const unFollowedUser = await User.findOneAndUpdate(
    { _id: userToUnFollow._id },
    {
      $pull: {
        followers: userId,
      },
    },
    { new: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User unfollowed successfully",
    data: {
      mainUserFollowings: mainUser.following,
    },
  });
};

const getFollowers = async (req, res) => {
  const { id } = req.params;
  let owner = await User.findById(id)
    .select("followers")
    .populate([
      {
        path: "followers",
        select: "_id firstName lastName",
      },
    ]);

  const followers = owner.followers.map((follower) => {
    return {
      fullName: follower.fullName,
      _id: follower._id,
      initials: follower.initials,
    };
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "",
    data: { followers },
  });
};

const getFollowings = async (req, res) => {
  const { id } = req.params;
  let owner = await User.findById(id)
    .select("following")
    .populate([
      {
        path: "following",
        select: "_id firstName lastName",
      },
    ]);

  const followings = owner.following.map((followee) => {
    return {
      fullName: followee.fullName,
      _id: followee._id,
      initials: followee.initials,
    };
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "",
    data: { followings },
  });
};

const deleteAccount = async (req, res) => {
  const { id } = req.user;
  const user = await User.findOneAndUpdate(
    { _id: id },
    { deleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "successfully deleted",
    data: null,
  });
};

export {
  getUser,
  followUser,
  unFollowUser,
  deleteAccount,
  getFollowers,
  getFollowings,
};
