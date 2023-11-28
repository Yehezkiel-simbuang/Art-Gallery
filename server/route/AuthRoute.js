const express = require("express");
const {
  loginMiddleware,
  registerMiddleware,
  logoutMiddleware,
  forgotPassword,
  resetPassword,
} = require("../middleware/AuthMiddleware");
const authRouter = express.Router();

authRouter.post("/login", loginMiddleware);
authRouter.post("/register", registerMiddleware);
authRouter.get("/logout", logoutMiddleware);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.patch("/resetpassword/:token", resetPassword);
module.exports = { authRouter };
