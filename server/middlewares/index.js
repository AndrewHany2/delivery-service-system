const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(
      new Error({
        code: 401,
        message: "Not authorized to access without token",
      })
    );
  }
  const token = req.headers.authorization;
  authService.verify(token, (err, data) => {
    if (err) {
      return next(new Error(err));
    }
    const { user } = data;
    req.user = user;
    req.user.id = user._id;
    return next();
  });
};

const validationMiddleware = (validationObject, isGet) => (req, res, next) => {
  const body = isGet ? req.query : req.body;
  const { error } = validationObject.validate(body);
  if (error) {
    error.statusCode = 422;
    error.message =
      error.message || "Parameters missing or Invalid values passed...!";
    return next(error);
  }
  return next();
};

const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
};

module.exports = {
  authMiddleware,
  validationMiddleware,
  ErrorHandler,
};
