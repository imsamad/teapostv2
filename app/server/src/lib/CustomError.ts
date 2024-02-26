import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public error: object) {
    super("Bad request");

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return this.error;
  }
}
