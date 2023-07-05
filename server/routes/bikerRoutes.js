const express = require("express");
const router = express.Router();
const { BikerController } = require("../controllers");
const { loginSchema } = require("../middlewares/validations");
const { validationMiddleware } = require("../middlewares");

router.post(
  "/",
  validationMiddleware(loginSchema, false),
  BikerController.login
);

module.exports = router;
