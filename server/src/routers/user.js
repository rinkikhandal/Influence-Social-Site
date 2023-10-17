import express from "express";
const router = express.Router();

import {
  getUser,
  followUser,
  unFollowUser,
  deleteAccount,
  getFollowers,
  getFollowings,
} from "../controllers/user.js";

router.route("/").delete(deleteAccount);

router.route("/followers/:id").get(getFollowers);

router.route("/followings/:id").get(getFollowings);

router.route("/:id").get(getUser);

router.route("/follow/:id").post(followUser);

router.route("/unfollow/:id").post(unFollowUser);

export default router;
