import expressAsyncHandler from "express-async-handler";
import { CustomError } from "./error.middleware.js";
import RESPONSE_CODE from "../../constants/responseCode.js";
import { auth } from "../../config/firebase.config.js";

const isLoggedIn = expressAsyncHandler(async (req, res, next) => {
  // idToken in cookies
  const { idToken } = req.cookies; // todo

  // idToken in Authorization header  (Bearer token);
  const bearerToken = req.headers.authorization;

  if (!(idToken || bearerToken)) {
    throw new CustomError("Please login first.", RESPONSE_CODE.UNAUTHORIZED);
  }

  const token = bearerToken?.split(" ")[1];

  const jwt_token = token || idToken;

  const decodedUser = await auth.verifyIdToken(jwt_token, true);

  req.user = decodedUser;

  return next();
});

export default isLoggedIn;
