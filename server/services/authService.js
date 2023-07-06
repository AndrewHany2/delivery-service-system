const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../keys");

class AuthService {
  static async encryptPassword(password) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error encrypting password");
    }
  }

  static async comparePasswords(plainPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      throw new Error("Error comparing passwords");
    }
  }

  static async issueToken(payload) {
    return jwt.sign(payload, keys.jwtSecret, {
      expiresIn: `${keys.jwtTokenExpiryInHours}h`,
    });
  }

  static async login({ email, password, storedPassword, id }) {
    if (await this.comparePasswords(password, storedPassword)) {
      const payload = {
        id,
        email: email,
      };
      const token = await this.issueToken(payload);
      return token;
    }
    throw new Error("Invalid username or password");
  }
}
module.exports = AuthService;
