const express = require("express");
const router = express.Router();
const { ParcelController } = require("../controllers");
const { Sender, Biker } = require("../models");
const { authMiddleware } = require("../middlewares");

router.get(
  "/",
  authMiddleware([Sender, Biker]),
  ParcelController.getAllParcels
);

module.exports = router;
