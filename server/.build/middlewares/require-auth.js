"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorised_1 = require("../lib/not-authorised");
const requireAuth = (req, res, next) => {
    if (!req.currentUser)
        throw new not_authorised_1.NotAuthorisedError();
    next();
};
exports.requireAuth = requireAuth;
