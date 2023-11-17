const express = require("express");
const multer = require("multer")();
const { uploadMedia, getArt, reset } = require("../middleware/MediaMiddleware");

const MediaRouter = express.Router();
MediaRouter.post("/submit", multer.single("image"), uploadMedia);
MediaRouter.get("/art", getArt);
MediaRouter.delete("/deleted", reset);
module.exports = MediaRouter;
