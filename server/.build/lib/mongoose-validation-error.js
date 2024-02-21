"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseValidationError = void 0;
const custom_error_1 = require("./custom-error");
class MongooseValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Invalid request parameters");
        this.errors = errors;
        this.statusCode = 400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, MongooseValidationError.prototype);
    }
    serializeErrors() {
        var _a, _b, _c, _d, _e, _f;
        // To handle duplicated/unique values
        if (this.errors.code === 11000) {
            const field = Object.keys(this.errors.keyValue)[0] || "";
            const value = (_b = (_a = this.errors) === null || _a === void 0 ? void 0 : _a.keyValue) === null || _b === void 0 ? void 0 : _b[field];
            return [
                {
                    field: field,
                    message: value ? value + " Already taken." : "It must be unique.",
                },
            ];
        }
        let err = [];
        for (let path in this.errors.errors) {
            err.push({
                field: path,
                message: ((_e = (_d = (_c = this.errors) === null || _c === void 0 ? void 0 : _c.errors) === null || _d === void 0 ? void 0 : _d[path]) === null || _e === void 0 ? void 0 : _e["message"]) ||
                    ((_f = this.errors[path]) === null || _f === void 0 ? void 0 : _f.message) ||
                    "Invalid Value",
            });
        }
        return err;
    }
}
exports.MongooseValidationError = MongooseValidationError;
