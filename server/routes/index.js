const senderRouter = require("./senderRoutes.js");
const bikerRouter = require("./bikerRoutes.js");
const { ErrorHandler } = require("../middlewares");

const addRoutes = (app) => {
  app.use("/api/sender", senderRouter);
  app.use("/api/biker", bikerRouter);
  app.use(ErrorHandler);
};

module.exports = addRoutes;
