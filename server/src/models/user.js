import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { log } from "winston";
dotenv.config(path.join(path.resolve(), ".env"));

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      validate: {
        validator: async function (value) {
          // Check if a user with the same email exists and is not deleted
          const existingUser = await this.constructor.findOne({
            email: value,
            deleted: false,
          });
          return !existingUser;
        },
        message: "Email is already in use.",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// getting virtual fields
// UserSchema.set("toObject", { virtuals: true });
// UserSchema.set("toJSON", { virtuals: true });

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual("initials").get(function () {
  return `${this.firstName[0]}${this.lastName[0]}`;
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      if (hashedPassword) {
        this.password = hashedPassword;
        next();
      } else {
        next(new Error("Could not hash password"));
      }
    } catch (error) {
      // Handle the error, e.g., log it or pass it to the next middleware.
      next(error);
    }
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

UserSchema.methods.createJWT = function () {
  const token = jwt.sign(
    {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      id: this._id,
    },
    process.env.JWT_AUTH_SECRET,
    { expiresIn: process.env.EXP }
  );
  return token;
};

export default mongoose.model("User", UserSchema);
