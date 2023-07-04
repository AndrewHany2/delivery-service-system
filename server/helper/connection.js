const mongoose = require("mongoose");
const mongoDbUrl = "mongodb://localhost:27017/delivery-service-system";
// connect to mongodb
const connect = () => {
  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully established connection to database");
    })
    .catch((err) => {
      console.error("Unable to connect to database", err);
    });
};
module.exports = {
  connect,
};
