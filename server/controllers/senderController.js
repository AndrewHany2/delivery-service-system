const { Sender } = require("../models");
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
      res.json(token);
    } catch (error) {
      return next(error);
    }
  }
}
module.exports = SenderController;
