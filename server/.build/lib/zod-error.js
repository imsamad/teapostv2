"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorHandler = void 0;
const custom_error_1 = require("./custom-error");
class ZodErrorHandler extends custom_error_1.CustomError {
    constructor(errors) {
        super("Invalid request parameters");
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, ZodErrorHandler.prototype);
    }
    serializeErrors() {
        let errors = this.errors;
        let tmpErr = {};
        for (let k in errors) {
            if (k == "_errors")
                continue;
            tmpErr[k] = errors[k]._errors;
        }
        return tmpErr;
    }
}
exports.ZodErrorHandler = ZodErrorHandler;
