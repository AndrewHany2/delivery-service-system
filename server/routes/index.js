const senderRouter = require("./senderRoutes.js");
const authRouter = require("./authRoutes.js");
const { ErrorHandler } = require("../middlewares");

const addRoutes = (app) => {
  app.use("/api/sender", senderRouter);
  app.use("/api/auth", authRouter);
  app.use(ErrorHandler);
};

module.exports = addRoutes;
