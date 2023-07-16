const { Biker, Parcel } = require("../models");
const mongoose = require("mongoose");
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
      const parcels = await Parcel.find({
        status: "PENDING",
        biker: { $eq: null },
      });
      res.json(parcels);
    } catch (error) {
      return next(error);
    }
  }

  static async pickParcel(req, res, next) {
    try {
      const parcel = await Parcel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.body._id) },
        {
          status: "PICKED",
          isPicked: true,
          biker: req.user._id,
          pickupDate: req.body.pickupDateTime,
          dropoffDate: req.body.dropoffDateTime,
        }
      );
      if (!parcel) {
        throw new Error("Can't update parcel");
      }
      const bikerParcels = req.user.parcels;
      bikerParcels.push(parcel._id);
      const updateBiker = await req.user.save();
      if (!updateBiker) {
        throw new Error("error in adding parcel to biker");
      }
      res.json({ success: true });
    } catch (error) {
      return next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const profile = await Biker.findOne({
        _id: new mongoose.Types.ObjectId(req.user._id),
      })
        .select("-password")
        .populate("parcels")
        .lean();

      res.json({ ...profile });
    } catch (error) {
      return next(error);
    }
  }
}
module.exports = BikerController;
