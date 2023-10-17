import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import User from "../models/user";
import {
  verifyResetToken,
  generateResetToken,
  verifyAuthToken,
} from "../utils/authUser/auth";
import { BadRequest, NotFound, UnAuthorizedAccess } from "../errors/index";

const registerUser = async (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    throw new BadRequest(validation.errors[0].msg || "provide all credentials");
  }

  const { firstName, lastName, email, password } = req.body;
  let user = await User.create({ firstName, lastName, email, password });

  user = {
    email: user.email,
    _id: user.id,
    firstName: user.firstName,
    initials: user.initials,
    fullName: user.fullName,
    followers: user.followers,
    following: user.following,
  };

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "user created successful",
    data: user,
  });
};

const loginUser = async (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    throw new BadRequest("provide all credentials");
  }

  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthorizedAccess("Invalid Credentials");
  }

  if (user && user.deleted === true) {
    throw new NotFound("user not found");
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    throw new UnAuthorizedAccess("Invalid Credentials");
  }

  const token = await user.createJWT();

  user = {
    email: user.email,
    _id: user.id,
    initials: user.initials,
    fullName: user.fullName,
    followers: user.followers,
    following: user.following,
  };

  return res.status(StatusCodes.OK).json({
    success: false,
    message: "successfully logged in",
    data: { token, user },
  });
};

const validateToken = async (req, res) => {
  const { token } = req.params;
  const validToken = await verifyAuthToken(token);
  let user = await User.findOne({ email: validToken.email, deleted: false });
  if (!user) {
    throw new NotFound("user not found");
  }

  user = {
    email: user.email,
    _id: user.id,
    initials: user.initials,
    fullName: user.fullName,
    followers: user.followers,
    following: user.following,
  };

  return res.json({
    success: true,
    message: "User validated successfully",
    data: { token, user },
  });
};

const forgotPassword = async (req, res) => {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    throw new BadRequest("bad request please provide email");
  }

  const { email } = req.body;

  const user = await User.findOne({ email, deleted: false }).select(
    "_id password email"
  );

  if (!user) {
    throw new NotFound("user not found");
  }

  const token = await generateResetToken({
    email: user.email,
    _id: user._id,
    password: user.password,
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "generated temporary token",
    data: {
      token,
      resetPassLink: "link",
    },
  });
};

const resetPassword = async (req, res) => {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    // console.log(validation.errors);
    throw new BadRequest(validation.errors[0].msg || "token not present");
  }

  const {
    body: { password },
    params: { token },
  } = req;

  const validToken = await verifyResetToken(token);

  if (!validToken || !validToken.email) {
    throw new BadRequest("Invalid or expired resetToken");
  }

  const { email } = validToken;

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update the user's password
  const user = await User.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

  return res.send({
    success: true,
    message: "Password reset successfully, login with your new password",
    data: null,
  });
};

export {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  validateToken,
};
