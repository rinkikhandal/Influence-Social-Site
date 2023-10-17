import logger from "../utils/logger/logs";
import { StatusCodes } from "http-status-codes";

const errorHandeler = (err, req, res, next) => {
  let customError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "something went wrong please try again later",
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
    customError.status = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 1100) {
    customError.message = `Duplicate value for ${Object.keys(
      err.KeyValue
    )}, please choose another value`;
    customError.status = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "CastError") {
    customError.message = `No item with id ${err.value}`;
    customError.status = StatusCodes.NOT_FOUND;
  }

  if (customError.status === StatusCodes.INTERNAL_SERVER_ERROR) {
    logger.error(customError);
  }

  return res
    .status(customError.status)
    .json({ success: false, message: customError.message, data: null });
};

export default errorHandeler;
