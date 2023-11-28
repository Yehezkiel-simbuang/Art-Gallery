const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");
const MediaRouter = require("./route/MediaRoute");
const { authRouter } = require("./route/AuthRoute");
const { userRouter } = require("./route/userRoute");

const app = express();
Sentry.init({
  dsn: "https://d4274a72ab9e2468623af1c39ce1bb91@o4506304101679104.ingest.sentry.io/4506304128548864",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", MediaRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use(express.static(path.join(__dirname, "..", "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/dist/index.html"));
});

app.use(Sentry.Handlers.errorHandler());
app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    sentry: res.sentry,
  });
});
app.listen(3000, () => {
  console.log("Connected to port 3000....");
});
