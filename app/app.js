require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

const connectDB = require("../config/db");
const {
  notFoundErrorHandelar,
  errorMiddleware,
} = require("../middlewares/errorMiddleware");
const authRouter = require("../routers/authRouter");
connectDB();
app.use([morgan("dev"), express.json()]);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "System is ok" });
});
app.use("/api/auth/user/", authRouter);
app.use("/api/auth/admin/", authRouter);
app.use(notFoundErrorHandelar);
app.use(errorMiddleware);

module.exports = app;
