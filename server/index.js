const express = require("express");
const path = require("path");
const MediaRouter = require("./route/MediaRoute");
const app = express();

app.use(express.urlencoded());

app.listen(3000, () => {
  console.log("Connected to port 3000....");
});

app.use("/api/v1", MediaRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
