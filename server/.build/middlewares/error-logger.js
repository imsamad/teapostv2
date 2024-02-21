"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = void 0;
const custom_error_1 = require("../lib/custom-error");
const errorLogger = (err, _req, res, _next) => {
    console.log("Error from Error-logger:");
    if (err instanceof custom_error_1.CustomError)
        console.error(err.serializeErrors());
    else
        console.error(err);
    _next(err);
};
exports.errorLogger = errorLogger;
