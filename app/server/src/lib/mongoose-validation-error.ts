import { CustomError } from "./custom-error";

export class MongooseValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: any) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, MongooseValidationError.prototype);
  }

  serializeErrors() {
    if (this.errors.code === 11000) {
      const field = Object.keys(this.errors.keyValue)[0] || "";
      const value = this.errors?.keyValue?.[field];
      return [
        {
          [field]: [value ? value + " already taken." : "It must be unique."],
        },
      ];
    }

    let err: any = {};
    for (let path in this.errors.errors) {
      if (!err[path]) err[path] = [];
      err[path].push(
        this.errors?.errors?.[path]?.["message"] ||
          this.errors[path]?.message ||
          "Invalid value"
      );
    }
    return err;
    // let err: any = [];
    // for (let path in this.errors.errors) {
    //   // if (!err[path]) err[path] = [];
    //   err.push({
    //     field: path,
    //     message:
    //       this.errors?.errors?.[path]?.["message"] ||
    //       this.errors[path]?.message ||
    //       "Invalid value",
    //   });
    // }
    return err;
  }
}
