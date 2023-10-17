import express from "express";
const router = express.Router();

import {
  addComment,
  getAllPostComments,
  likeComment,
} from "../controllers/comments";

router.route("/:postId").post(addComment).get(getAllPostComments);
router.route("/like/:commentId").get(likeComment);

export default router;
