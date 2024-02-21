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
const validate_request_1 = require("../../middlewares/validate-request");
const crypto_1 = __importDefault(require("crypto"));
const zod_1 = __importDefault(require("zod"));
const Confirmation_1 = __importDefault(require("../../models/Confirmation"));
const bad_request_error_1 = require("../../lib/bad-request-error");
const User_1 = __importDefault(require("../../models/User"));
const payloadSchema = zod_1.default.object({
    password: zod_1.default.string({
        required_error: "Password is required",
    }),
    confirmPassword: zod_1.default.string({
        required_error: "Password is required",
    }),
});
// @desc    Reset password
// @route   POST /api/auth/resetPassword
// @access  Public
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password != req.body.confirmPassword)
        throw new bad_request_error_1.BadRequestError("Password must be same!");
    const token = req.params.token;
    const hashedVerifyToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const confirmation = yield Confirmation_1.default.findOne({
        token: hashedVerifyToken,
    });
    if (!confirmation)
        throw new bad_request_error_1.BadRequestError("Invalid request");
    // @ts-ignore
    let createdAt = new Date(confirmation.createdAt).getTime();
    const now = new Date().getTime();
    const tenMinutesMS = Number(process.env.RESET_LINK_EXPIRE_minutes) * 60 * 1000;
    let isExpired = now - createdAt > tenMinutesMS;
    if (isExpired) {
        yield confirmation.deleteOne();
        throw new bad_request_error_1.BadRequestError("Link expired");
    }
    const user = yield User_1.default.findById(confirmation.user);
    if (!user) {
        yield confirmation.deleteOne();
        throw new bad_request_error_1.BadRequestError("Invalid request");
    }
    user.password = req.body.password;
    yield user.save();
    yield confirmation.deleteOne();
    res.json({
        message: "Password reseted successsully!",
    });
});
exports.default = [(0, validate_request_1.validateRequest)(payloadSchema, "body"), resetPassword];
