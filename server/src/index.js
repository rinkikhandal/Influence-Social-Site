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
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));
// app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["https://influence-social-site-front-end.onrender.com"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If need to include cookies in your requests
};

app.use(cors(corsOptions));

// app.use(cors());

app.use(morganMiddleware);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRoutes);

// applied on the below routes

app.use("/api/user", authenticateUser, userRoutes);

app.use("/api/post", authenticateUser, postRoutes);

app.use("/api/posts", authenticateUser, generalPostRoutes);

app.use("/api/comment", authenticateUser, commentRoutes);

app.use(errorHandeler);

export default app;
