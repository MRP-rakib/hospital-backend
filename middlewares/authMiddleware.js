require("dotenv").config();
const JWT = require("jsonwebtoken");

const authenticJWT = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "no token provided" });
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "token missing" });
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    error.status = 403;
    console.log(error);

    next(error);
  }
};

module.exports = authenticJWT;
