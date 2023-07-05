const { BikerModel } = require("../models/biker");
const AuthService = require("../services/authService");

class BikerController {
  static async login(req, res, next) {
    try {
      let params = req.body;
      const biker = await BikerModel.findOne({
        email: { $regex: new RegExp(`\\b${params.email}\\b`, "i") },
      });
      if (!biker) throw new Error("biker not found");
      params = {
        ...params,
        storedPassword: biker.password,
        id: biker._id,
      };
      const token = await AuthService.login(params);
      res.json(token);
    } catch (error) {
      return next(error);
    }
  }
}
module.exports = BikerController;
