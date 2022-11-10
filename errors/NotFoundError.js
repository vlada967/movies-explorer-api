class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundErorr';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
