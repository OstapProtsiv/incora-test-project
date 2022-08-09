const ApiError = require('../errors/validation.error');
const jwtService = require('../users/jwt.service');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw ApiError.Forbidden('access is denied');
    }
    const isValidToken = jwtService.validateToken(token);
    if (!isValidToken) {
      throw ApiError.Forbidden('access is denied');
    }
    next();
  } catch (error) {
    next(error);
  }
};
