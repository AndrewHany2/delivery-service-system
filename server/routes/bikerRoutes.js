const express = require("express");
const router = express.Router();
const { BikerController } = require("../controllers");
const { loginSchema } = require("../middlewares/validations");
const { validationMiddleware, authMiddleware } = require("../middlewares");
const { Biker } = require("../models");

router.post(
  "/login",
  validationMiddleware(loginSchema, false),
  BikerController.login
);

router.get("/parcels", authMiddleware(Biker), BikerController.getAllParcels);

module.exports = router;
