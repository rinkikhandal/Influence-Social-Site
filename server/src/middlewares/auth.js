import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import logger from "../utils/logger/logs";

const authenticateUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "token required",
        date: null,
      });
    }
    token = token.split(" ")[1];

    const { id, email, firsName, lastName } = await jwt.verify(
      token,
      process.env.JWT_AUTH_SECRET
    );
    req.user = { id, email, firsName, lastName };
    next();
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Invalid token",
      data: null,
    });
  }
};

export default authenticateUser;
