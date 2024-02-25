import { CustomError } from "./custom-error";

export class MongooseValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: any) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, MongooseValidationError.prototype);
  }

  serializeErrors() {
    // To handle duplicated/unique values
    if (this.errors.code === 11000) {
      const field = Object.keys(this.errors.keyValue)[0] || "";
      const value = this.errors?.keyValue?.[field];
      return [
        {
          field: field,
          message: value ? value + " Already taken." : "It must be unique.",
        },
      ];
    }

    let err: any = [];
    for (let path in this.errors.errors) {
      err.push({
        field: path,
        message:
          this.errors?.errors?.[path]?.["message"] ||
          this.errors[path]?.message ||
          "Invalid Value",
      });
    }
    return err;
  }
}
