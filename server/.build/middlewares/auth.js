"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const not_authorised_1 = require("../lib/not-authorised");
const currentUser = (req, res, next) => {
    var _a, _b, _c, _d;
    let authSession = req.cookies["auth-session"];
    if (!authSession && ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer ")))
        authSession = (_d = (_c = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.call(_b, " ")) === null || _d === void 0 ? void 0 : _d[1];
    if (!authSession)
        return next();
    try {
        const payload = jsonwebtoken_1.default.verify(authSession, process.env.JWT_KEY);
        req.currentUser = (payload === null || payload === void 0 ? void 0 : payload.id) ? { id: payload.id } : undefined;
    }
    catch (_) { }
    next();
};
exports.currentUser = currentUser;
const requireAuth = (req, _, next) => {
    var _a;
    if (!((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id))
        throw new not_authorised_1.NotAuthorisedError();
    next();
};
exports.requireAuth = requireAuth;
