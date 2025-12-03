const notFoundErrorHandelar = (_req, _res, next) => {
  const error = new Error("Resources not found");
  error.status = 404;
  next(error);
};

const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err.status || 500
  res.status(statusCode).json({
    message: err.message || "Something went wrong",
  });
};

module.exports = { notFoundErrorHandelar, errorMiddleware };
