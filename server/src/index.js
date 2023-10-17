import express from "express";
import "express-async-errors";
import cors from "cors";

import authRoutes from "./routers/auth.js";
import authenticateUser from "./middlewares/auth.js";
import userRoutes from "./routers/user";
import postRoutes from "./routers/userPosts.js";

import generalPostRoutes from "./routers/generalPosts.js";
import commentRoutes from "./routers/comments.js";

import errorHandeler from "./middlewares/errorHandeler.js";
import { morganMiddleware } from "./utils/logger/logs.js";

const app = express();
app.use(cors());
// {
//     origin: "https://influence-social-site-backend.vercel.app/",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     credentials: true,
//   }

app.use(morganMiddleware);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// applied on the below routes

app.use(authenticateUser);

app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);

app.use("/api/posts", generalPostRoutes);

app.use("/api/comment", commentRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(errorHandeler);

export default app;
