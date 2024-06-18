const notFound = (req, res, next) => {
  const error = new Error(`Path not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };