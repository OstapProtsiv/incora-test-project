const jwt = require('jsonwebtoken');

class JwtService {
  generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
    return token;
  }

  validateToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new JwtService();
