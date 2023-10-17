import express from "express";
import { body } from "express-validator";
import upload from "../utils/uploads/upload";
const router = express.Router();

import {
  addPost,
  updatePost,
  deletePost,
  likePost,
  unLikePost,
  getPost,
} from "../controllers/userPosts.js";

router
  .route("/")
  .post(
    body("title")
      .isLength({ min: 2, max: 20 })
      .withMessage(
        "title should be at least 2 characters long and at most 20 characters long"
      ),
    upload.single("image"),
    addPost
  );

router
  .route("/:id")
  .patch(upload.single("image"), updatePost)
  .delete(deletePost)
  .get(getPost);

router.route("/like/:postId").get(likePost);
router.route("/unlike/:postId").get(unLikePost);

export default router;
