const express = require("express");
const multer = require("multer")();
const { uploadMedia, getArt, reset } = require("../middleware/MediaMiddleware");
const { verifyToken } = require("../utils/verifyToken");
const { isAdmin } = require("../utils/isAdmin");

const MediaRouter = express.Router();
MediaRouter.post("/submit", multer.single("image"), verifyToken, uploadMedia);
MediaRouter.get("/art", getArt);
MediaRouter.delete("/deleted", verifyToken, isAdmin, reset);
module.exports = MediaRouter;
