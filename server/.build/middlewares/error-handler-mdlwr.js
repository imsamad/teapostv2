"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../lib/custom-error");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }
    res.status(500).json({
        errors: [{ message: "Something went wrong!" }],
    });
};
exports.errorHandler = errorHandler;
