import jwt from "jsonwebtoken";
import { BadRequest } from "../../errors";
import { StatusCodes } from "http-status-codes";

const generateResetToken = (payload) =>
  jwt.sign(payload, process.env.RESET_PASSWORD_JWT_SECRET, { expiresIn: 120 });

const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, process.env.RESET_PASSWORD_JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new BadRequest("Token expired");
    } else {
      return res
        .status(error.status)
        .json({ success: false, message: error.message });
    }
  }
};

const verifyAuthToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_AUTH_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new BadRequest("Token expired");
    } else {
      return res
        .status(error.status)
        .json({ success: false, message: error.message });
    }
  }
};

export { generateResetToken, verifyResetToken, verifyAuthToken };
