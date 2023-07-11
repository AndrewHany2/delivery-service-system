const express = require("express");
const router = express.Router();
const { ParcelController } = require("../controllers");
const { Sender } = require("../models");
const { authMiddleware } = require("../middlewares");

router.get("/", authMiddleware(Sender), ParcelController.getAllParcels);

module.exports = router;
