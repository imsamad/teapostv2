"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const User_1 = __importDefault(require("../../models/User"));
const bad_request_error_1 = require("../../lib/bad-request-error");
const validate_request_1 = require("../../middlewares/validate-request");
const payloadSchema = zod_1.default.object({
    identifier: zod_1.default.string({
        required_error: "Identifier is required, either email or username.",
    }),
    password: zod_1.default.string({
        required_error: "Password is required.",
    }),
});
// @desc    Login
// @route   POST Log in
// @access  Public
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, identifier } = req.body;
    const user = yield User_1.default.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        // @ts-ignore
    })
        // @ts-ignore
        .isUserValid()
        .select("+password");
    if (!user || !(yield user.matchPassword(password)))
        throw new bad_request_error_1.BadRequestError("Provide valid credentials!");
    const userJwt = jsonwebtoken_1.default.sign({
        id: user._id,
        now: Date.now(),
    }, process.env.JWT_KEY);
    res.cookie("auth-session", userJwt, {
        maxAge: Date.now() + 5 * 60 * 1000,
        secure: process.env.NODE_ENV == "production",
        httpOnly: true,
        sameSite: "strict",
    });
    return res.json({ user, session: userJwt });
});
exports.default = [(0, validate_request_1.validateRequest)(payloadSchema, "body"), login];
