const express = require("express");
const router = express.Router();
const { SenderController } = require("../controllers");
const { loginSchema } = require("../middlewares/validations");
const { validationMiddleware } = require("../middlewares");

router.post(
  "/login",
  validationMiddleware(loginSchema, false),
  SenderController.login
);

module.exports = router;
