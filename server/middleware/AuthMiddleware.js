const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler");
const { mailSender } = require("../utils/email");
const { request } = require("express");

require("dotenv").config();
// response.cookie;
// response.clearCookie;
const prisma = new PrismaClient();
const loginMiddleware = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const isEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!isEmail) {
      return next(errorHandler(400, "Username or password incorrect"));
    }
    const encryptedPass = bcryptjs.compareSync(pass, isEmail.password);
    if (!encryptedPass) {
      return next(errorHandler(400, "Username or password incorrect"));
    }
    const { password, createdAt, updateAt, ...payload } = isEmail;
    const token = jwt.sign(payload, process.env.JWT_PASS, {
      expiresIn: "30m",
    });
    res
      .status(200)
      .cookie("access_token", token, { maxAge: 60000 * 30 })
      .json({ status: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};
const registerMiddleware = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const isUser = await prisma.user.findFirst({ where: { email: email } });
    if (isUser) {
      return next(errorHandler(500, "Email already used"));
    }
    const encryptedPass = bcryptjs.hashSync(pass, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: encryptedPass,
      },
    });
    if (!newUser) {
      return next(errorHandler(500, "Can't create account"));
    }
    res.status(200).json({ status: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};

const logoutMiddleware = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ status: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const isUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!isUser) {
      return next(errorHandler(404, "Email not found"));
    }
    const { password, photoUrl, role, createdAt, updateAt, ...payload } =
      isUser;
    const resetToken = jwt.sign(payload, process.env.JWT_PASS, {
      expiresIn: "10m",
    });
    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `Click the link below to reset your password account\n\n${url}\n\n The link above is valid until the next 10 minutes\n\nRegards,\nOwner`;
    await mailSender({
      to: req.body.email,
      subject: "Password change request",
      message: message,
    });
    res.status(200).json({ status: "SUCCESS", message: "Check you email" });
  } catch (error) {
    next(error);
  }
};
const resetPassword = (req, res, next) => {
  try {
    jwt.verify(req.params.token, process.env.JWT_PASS, async (err, user) => {
      if (err) {
        return next(errorHandler(401, "Token invalid or expired"));
      }
      const encryptedPass = bcryptjs.hashSync(req.body.newPass, 10);
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: {
          password: encryptedPass,
        },
      });
      if (!updated) {
        return next(errorHandler(500, "Can't update"));
      }
      res.status(200).json({ status: "SUCCESS", message: "Password changed" });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginMiddleware,
  registerMiddleware,
  logoutMiddleware,
  forgotPassword,
  resetPassword,
};
