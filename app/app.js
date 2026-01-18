require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require("../config/db");
const authRouter = require('../routers/authRoute')
const {
  notFoundErrorHandelar,
  errorMiddleware,
} = require("../middlewares/errorMiddleware");
connectDB();

app.use([morgan("dev"), cors({
  origin:['http://localhost:3000','https://dashboard-iota-eight-53.vercel.app'],
  methods: ["GET", "POST", "PUT", "PATCH" , "DELETE"],
  credentials:true
}),cookieParser(), express.json()]);


app.get("/", (_req, res) => {
  res.status(200).json({ message: "System is ok" });
});

app.use("/api/auth/admin/",authRouter);
app.use("/api/auth/user/", authRouter);
app.use(notFoundErrorHandelar);
app.use(errorMiddleware);

module.exports = app;
