const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const MediaRouter = require("./route/MediaRoute");
const { authRouter } = require("./route/AuthRoute");
const { userRouter } = require("./route/userRoute");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Connected to port 3000....");
});

app.use("/api/v1", MediaRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use(express.static(path.join(__dirname, "..", "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/dist/index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
