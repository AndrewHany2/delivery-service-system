const express = require("express");
const router = express.Router();
const { BikerController } = require("../controllers");
const { loginSchema, pickParcelSchema } = require("../middlewares/validations");
const { validationMiddleware, authMiddleware } = require("../middlewares");
const { Biker } = require("../models");

router.post(
  "/login",
  validationMiddleware(loginSchema, false),
  BikerController.login
);

router.get("/parcels", authMiddleware(Biker), BikerController.getAllParcels);

router.get("/profile", authMiddleware(Biker), BikerController.getProfile);

router.post(
  "/pick-parcel",
  validationMiddleware(pickParcelSchema, false),
  authMiddleware(Biker),
  BikerController.pickParcel
);

module.exports = router;
