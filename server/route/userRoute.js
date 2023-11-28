const express = require("express");
const { verifyToken } = require("../utils/verifyToken");
const {
  updateMiddleware,
  deleteMiddleware,
} = require("../middleware/UserMiddleware");
const { isAdmin } = require("../utils/isAdmin");
const userRouter = express.Router();

userRouter.post("/update/:id", verifyToken, updateMiddleware);
userRouter.delete("/delete/:id", verifyToken, isAdmin, deleteMiddleware);

module.exports = { userRouter };
