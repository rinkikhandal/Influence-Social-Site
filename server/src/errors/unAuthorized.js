import CustomApiError from "./customError";
import { StatusCodes } from "http-status-codes";

class UnAuthorizedAccess extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthorizedAccess;
