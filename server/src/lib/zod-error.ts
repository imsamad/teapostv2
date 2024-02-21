import { CustomError } from "./custom-error";

export class ZodErrorHandler extends CustomError {
  statusCode = 400;

  constructor(public errors: any) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, ZodErrorHandler.prototype);
  }

  serializeErrors() {
    let errors = this.errors;

    let tmpErr: any = {};

    for (let k in errors) {
      if (k == "_errors") continue;
      tmpErr[k] = errors[k]._errors;
    }

    return tmpErr;
  }
}
