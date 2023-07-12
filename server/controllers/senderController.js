const { Sender, Parcel } = require("../models");
const AuthService = require("../services/authService");

class SenderController {
  static async login(req, res, next) {
    try {
      let params = req.body;
      const sender = await Sender.findOne({
        email: { $regex: new RegExp(`\\b${params.email}\\b`, "i") },
      });
      if (!sender) throw new Error("sender not found");
      params = {
        ...params,
        storedPassword: sender.password,
        id: sender._id,
      };
      const token = await AuthService.login(params);
      res.json({ token, email: sender.email });
    } catch (error) {
      return next(error);
    }
  }
  static async sendParcel(req, res, next) {
    try {
      const { pickupAddress, dropoffAddress } = req.body;
      const parcel = await Parcel.create({ pickupAddress, dropoffAddress });
      req.user.parcels.push(parcel);
      await req.user.save();
      res.json(parcel);
    } catch (error) {
      return next(error);
    }
  }
  static async getParcels(req, res, next) {
    try {
      const parcels = await Parcel.find({ _id: { $in: req.user.parcels } });
      res.json(parcels);
    } catch (error) {
      return next(error);
    }
  }
}
module.exports = SenderController;
