class ErrUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 401;
  }
}

module.exports = ErrUnauthorized;
