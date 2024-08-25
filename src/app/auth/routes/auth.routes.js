import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import isLoggedIn from "../../../common/middlewares/isLoggedIn.middleware.js";

const authRouter = Router();

// api/v1/auth
authRouter.post("/signup", authController.signup);

authRouter.use(isLoggedIn);

authRouter.patch("/update-user", authController.update);

authRouter.delete("/delete-user", authController.delete);

// signin and logout will be handled by firebase client sdk at client level

// but server will revoke the token on logout
authRouter.post("/logout", authController.logout);

export default authRouter;
