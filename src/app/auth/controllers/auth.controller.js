import expressAsyncHandler from "express-async-handler";

import { CustomError } from "../../../common/middlewares/error.middleware.js";
import RESPONSE_CODE from "../../../constants/responseCode.js";
import authService from "../services/auth.service.js";
import { SuccessResponse } from "../../../models/apiResponse.js";
import RESPONSE_TITLE from "../../../constants/responseTitle.js";
import removeKeyFromObj from "../../../utils/removeEmptyKeyFromObj.js";

class AuthController {
  signup = expressAsyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    // TODO: handle in separate file
    if (!(email && password && username)) {
      throw new CustomError(
        "email, password, and username is required.",
        RESPONSE_CODE.BAD_REQUEST
      );
    }

    const createdUser = await authService.signUp({ email, password, username });

    const response = new SuccessResponse({
      success: true,
      data: createdUser,
      message: "User created successfully..",
      statusCode: RESPONSE_CODE.CREATED,
      title: RESPONSE_TITLE.CREATED,
    });

    return res.status(RESPONSE_CODE.CREATED).json(response);
  });

  update = expressAsyncHandler(async (req, res) => {
    const {
      email,
      emailVerified,
      phoneNumber,
      password,
      displayName,
      photoURL,
      disabled,
    } = req.body;

    const updateObject = removeKeyFromObj({
      email,
      emailVerified,
      phoneNumber,
      password,
      displayName,
      photoURL,
      disabled,
    });

    if (!updateObject) {
      throw new CustomError("Please pass some filed which you want to update.");
    }

    const userId = req.user.uid;
    const updatedUser = await authService.updateUser({
      userId,
      userInfo: updateObject,
    });

    const response = new SuccessResponse({
      success: true,
      data: updatedUser,
      message: "User updated successfully..",
      statusCode: RESPONSE_CODE.OK,
      title: RESPONSE_TITLE.UPDATED,
    });

    return res.status(RESPONSE_CODE.OK).json(response);
  });

  delete = expressAsyncHandler(async (req, res) => {
    const userId = req.user.uid;

    const data = await authService.deleteUser(userId);

    const response = new SuccessResponse({
      success: true,
      data,
      message: "User deleted successfully..",
      statusCode: RESPONSE_CODE.OK,
      title: RESPONSE_TITLE.DELETED,
    });

    return res.status(RESPONSE_CODE.OK).json(response);
  });

  logout = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    const data = await authService.logout(userId);

    const response = new SuccessResponse({
      success: true,
      title: RESPONSE_TITLE.OK,
      statusCode: RESPONSE_CODE.OK,
      message: "All user Token revoked",
      data,
    });

    return res.status(RESPONSE_CODE.OK).json(response);
  });
}

const authController = new AuthController();

export default authController;
