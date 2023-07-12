const { Parcel } = require("../models");

class ParcelController {
  static async getAllParcels(req, res, next) {
    try {
      console.log(req.user);
      const parcels = await Parcel.find({});
      res.json(parcels);
    } catch (error) {
      return next(error);
    }
  }
}
module.exports = ParcelController;
