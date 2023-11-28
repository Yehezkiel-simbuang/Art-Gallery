const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require("../utils/imagekit");

const uploadMedia = async (req, res, next) => {
  try {
    const stringFile = req.file.buffer.toString("base64");
    const uploadToImagekit = await imagekit.upload({
      fileName: req.file.originalname,
      file: stringFile,
    });
    const uploadDataToDatabase = await prisma.art.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        url: uploadToImagekit.url,
        userId: req.user.id,
      },
    });
    return res.status(200).json({
      status: "SUCCESS",
      message: "Art uploaded",
      data: {
        url: uploadDataToDatabase.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getArt = async (req, res, next) => {
  try {
    const art = await prisma.art.findMany();
    return res.status(200).json(art);
  } catch (error) {
    next(error);
  }
};

const reset = async (req, res, next) => {
  try {
    const del = await prisma.art.deleteMany();
    return res.status(200).json({ message: "delete success" });
  } catch (error) {
    next(error);
  }
};
module.exports = { uploadMedia, getArt, reset };
