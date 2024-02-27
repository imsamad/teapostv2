import { CustomError } from "./custom-error";

export class ZodErrorHandler extends CustomError {
  statusCode = 400;

  constructor(public errors: any) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, ZodErrorHandler.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}
