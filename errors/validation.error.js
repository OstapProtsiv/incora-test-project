class ApiError extends Error {
  constructor(status, message, errors = {}) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  static ValidationError(message, errors) {
    return new ApiError(400, message, errors);
  }

  static Forbidden(message) {
    return new ApiError(403, message);
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }
}
module.exports = ApiError;
