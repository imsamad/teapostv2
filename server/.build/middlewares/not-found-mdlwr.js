"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorMdlwr = void 0;
const custom_error_1 = require("../lib/custom-error");
class NotFoundErrorMdlwr extends custom_error_1.CustomError {
    constructor() {
        super("Route not found");
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundErrorMdlwr.prototype);
    }
    serializeErrors() {
        return [{ message: "Not Found" }];
    }
}
exports.NotFoundErrorMdlwr = NotFoundErrorMdlwr;
