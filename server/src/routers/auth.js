import express from "express";
import { body, param } from "express-validator";
const router = express.Router();
import {
  registerUser,
  loginUser,
  resetPassword,
  forgotPassword,
  validateToken,
} from "../controllers/auth";

router.post(
  "/signup",
  [
    body("firstName")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),

    body("lastName")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long"),

    body("email").isEmail().withMessage("Please provide a valid email address"),

    body("password")
      .isLength({ min: 4 })
      .withMessage("Password should be at least 4 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  body("email").isEmail().withMessage("please provide a valid email"),

  body("password")
    .isLength({ min: 4 })
    .withMessage("password should be at least 4 characters long"),

  loginUser
);

router.route("/validate/:token").get(validateToken);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("please provide a valid email"),

  forgotPassword
);

router.patch(
  "/reset-password/:token",
  body("password")
    .isLength({ min: 4 })
    .withMessage("password should be at least 4 characters long"),

  param("token").isJWT().withMessage("Invalid token"),

  resetPassword
);

export default router;
