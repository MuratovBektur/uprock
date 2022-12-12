const jwt = require("jsonwebtoken");

const sign = (body, key, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(body, key, options, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const verify = (token, key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const ACCESS_SECRET = "yourSecretToken";

class JWTService {
  async generateAccessToken(body) {
    try {
      if (!ACCESS_SECRET) throw "ACCESS_SECRET not found";
      const token = await sign(body, ACCESS_SECRET, {
        expiresIn: "1h",
      });
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async verifyAccessToken(token) {
    try {
      if (!ACCESS_SECRET) throw "ACCESS_SECRET not found";
      const body = await verify(token, ACCESS_SECRET);
      return body;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = new JWTService();
