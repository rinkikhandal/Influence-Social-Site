import express from "express";
const router = express.Router();
import { getAllPosts } from "../controllers/generalPosts";

router.route("/").get(getAllPosts);
// router.route("/:postId").get(getPost);

export default router;
