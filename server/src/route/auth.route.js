import express from "express";
import authController from "../controller/auth.controller.js";
import validate from "../validation/validate.validatation.js";
import authSchema from "../validation/authSchema.validation.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validate(authSchema.register),
  authController.register
);
authRouter.post("/login", validate(authSchema.login), authController.login);
authRouter.post(
  "/forgot-password",
  validate(authSchema.forgotPassword),
  authController.forgotPassword
);
authRouter.post(
  "/reset-password/:token",
  validate(authSchema.resetPassword),
  authController.resetPassword
);
authRouter.post("/refresh-token", authController.refreshToken);

authRouter.put("/profile", authMiddleware.checkToken, authController.updateProfile);
authRouter.get("/me", authMiddleware.checkToken, authController.getMe);
authRouter.post("/logout", authController.logout);

export default authRouter;
