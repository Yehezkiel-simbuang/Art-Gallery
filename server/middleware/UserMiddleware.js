const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler");
//request.cookies
//request.params
const prisma = new PrismaClient();
const updateMiddleware = async (req, res, next) => {
  if (req.params.id != req.user.id) {
    return next(errorHandler(401, "You have no right"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const userUpdate = await prisma.user.update({
      where: {
        id: +req.params.id,
      },
      data: {
        email: req.body.email,
        password: req.body.password,
        photoUrl: req.body.photoUrl,
      },
    });
    if (!userUpdate) {
      next(errorHandler(401, "Can't update"));
    }
    res.status(200).json({ status: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};

const deleteMiddleware = async (req, res, next) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id: +req.params.id,
    },
  });
  if (!deletedUser) {
    return next(errorHandler(500, "Can't delete user"));
  }
  res.status(200).json({ status: "SUCCESS" });
};
module.exports = { updateMiddleware, deleteMiddleware };
