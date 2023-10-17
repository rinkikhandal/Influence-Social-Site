import CustomApiError from "./customError";
import { StatusCodes } from "http-status-codes";

class NotFound extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
  }
}

export default NotFound;
