export const errorHandler = (res, statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (process.env.NODE_ENV === "development") {
    error.stack = new Error().stack;
  }
  return res
    .status(error.statusCode)
    .json({ error: error.message, stack: error.stack });
};
