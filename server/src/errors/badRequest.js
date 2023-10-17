import CustomApiError from "./customError";
import { StatusCodes } from "http-status-codes";

class BadRequest extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
