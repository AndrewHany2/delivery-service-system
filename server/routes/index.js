const senderRouter = require("./senderRoutes.js");
const bikerRouter = require("./bikerRoutes.js");
const parcelRouter = require("./parcelRoutes.js");

const { ErrorHandler } = require("../middlewares");

const addRoutes = (app) => {
  app.use("/api/sender", senderRouter);
  app.use("/api/biker", bikerRouter);
  app.use("/api/parcel", parcelRouter);
  app.use(ErrorHandler);
};

module.exports = addRoutes;
