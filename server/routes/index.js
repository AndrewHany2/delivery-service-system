const senderRouter = require("./senderRoutes.js");

const addRoutes = (app) => {
  app.use("/api/sender", senderRouter);
};

module.exports = addRoutes;
