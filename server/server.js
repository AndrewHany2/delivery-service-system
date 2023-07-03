// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const addRoutes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

addRoutes(app);

// Start the server
const port = 3000; // Change to the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
