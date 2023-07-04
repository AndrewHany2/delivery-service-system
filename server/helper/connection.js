const mongoose = require("mongoose");
const mongoDbUrl = "mongodb://localhost:27017/delivery-service-system";
// connect to mongodb
const connect = async () => {
  try {
    const db = await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully established connection to database");
    return db;
  } catch (err) {
    console.error("Unable to connect to database", err);
  }
};

module.exports = {
  connect,
};
