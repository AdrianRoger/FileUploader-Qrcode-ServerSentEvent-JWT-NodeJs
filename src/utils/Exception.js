class Exception {
  #error;
  #statusCode;

  constructor({ error, statusCode }) {
    this.#error = error;
    this.#statusCode = statusCode;
  }

  get error() {
    return this.#error;
  }

  get statusCode() {
    return this.#statusCode;
  }
}

class InternalServerException extends Exception {
  constructor() {
    super({ error: "Internal server error.", statusCode: 500 });
  }
}

class BadRequestException extends Exception {
  constructor(error) {
    super({ error: error, statusCode: 400 });
  }
}

class UnauthorizedException extends Exception {
  constructor(error) {
    super({ error: error, statusCode: 401 });
  }
}

class NotFoundException extends Exception {
  constructor(error) {
    super({ error: error, statusCode: 404 });
  }
}

module.exports = {
  Exception,
  InternalServerException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException
}
