const { Biker, Parcel } = require("../models");
const AuthService = require("../services/authService");

class BikerController {
  static async login(req, res, next) {
    try {
      let params = req.body;
      const biker = await Biker.findOne({
        email: { $regex: new RegExp(`\\b${params.email}\\b`, "i") },
      });
      if (!biker) throw new Error("biker not found");
      params = {
        ...params,
        storedPassword: biker.password,
        id: biker._id,
      };
      const token = await AuthService.login(params);
      res.json({ token, email: biker.email });
    } catch (error) {
      return next(error);
    }
  }

  static async getAllParcels(req, res, next) {
    try {
      const parcels = await Parcel.find({ status: "PENDING" });
      res.json(parcels);
    } catch (error) {
      return next(error);
    }
  }
}
module.exports = BikerController;
