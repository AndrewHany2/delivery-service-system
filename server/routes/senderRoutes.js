const express = require("express");
const router = express.Router();
const { SenderController } = require("../controllers");
const { loginSchema, sendParcelSchema } = require("../middlewares/validations");
const { validationMiddleware, authMiddleware } = require("../middlewares");
const { Sender } = require("../models");

router.post(
  "/login",
  validationMiddleware(loginSchema, false),
  SenderController.login
);
router.post(
  "/parcel/send",
  validationMiddleware(sendParcelSchema, false),
  authMiddleware(Sender),
  SenderController.sendParcel
);

router.get("/parcels", authMiddleware(Sender), SenderController.getParcels);

module.exports = router;
