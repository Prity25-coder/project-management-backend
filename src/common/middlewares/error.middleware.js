import RESPONSE_CODE from "../../constants/responseCode.js";
import ENV_CONFIG from "../../config/env.config.js";
import { ErrorResponse } from "../../models/apiResponse.js";
import RESPONSE_TITLE from "../../constants/responseTitle.js";

export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = async (error, req, res, next) => {
  let statusCode = error.statusCode || RESPONSE_CODE.INTERNAL_SERVER_ERROR;
  let errorTitle = "";

  if (error.code) {
    statusCode = RESPONSE_CODE.BAD_REQUEST;
    if (error.code === "auth/id-token-revoked") {
      statusCode = RESPONSE_CODE.UNAUTHORIZED;
    }
  }

  switch (statusCode) {
    case RESPONSE_CODE.BAD_REQUEST:
      errorTitle = RESPONSE_TITLE.BAD_REQUEST;
      break;
    case RESPONSE_CODE.UNAUTHORIZED:
      errorTitle = RESPONSE_TITLE.UNAUTHORIZED;
      break;
    default:
      errorTitle = RESPONSE_TITLE.INTERNAL_SERVER_ERROR;
  }

  // Create error response
  const errorResponse = new ErrorResponse({
    success: false,
    data: null,
    title: errorTitle,
    message: error.message,
    statusCode,
  });

  // Check if the environment is "development" to include the stackTrace
  if (
    !ENV_CONFIG.production &&
    statusCode === RESPONSE_CODE.INTERNAL_SERVER_ERROR
  ) {
    errorResponse.stackTrace = error.stack;
  }

  return res.status(statusCode).json(errorResponse);
};

export default errorHandler;
