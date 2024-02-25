import { CustomError } from "../lib/custom-error";

export class NotFoundErrorMdlwr extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NotFoundErrorMdlwr.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
