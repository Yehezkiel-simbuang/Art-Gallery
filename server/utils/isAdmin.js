const { Role } = require("@prisma/client");
const { errorHandler } = require("./errorHandler");
const isAdmin = (req, res, next) => {
  if (req.user.role != Role.Admin) {
    return next(errorHandler(401, "Unauthorized Access"));
  }
  next();
};

module.exports = { isAdmin };
