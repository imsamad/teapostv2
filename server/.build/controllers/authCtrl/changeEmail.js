"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const crypto_1 = __importDefault(require("crypto"));
const zod_1 = __importDefault(require("zod"));
const Confirmation_1 = __importStar(require("../../models/Confirmation"));
const sendEmail_1 = require("../../lib/sendEmail");
const validate_request_1 = require("../../middlewares/validate-request");
const payloadSchema = zod_1.default.object({
    newEmail: zod_1.default
        .string({
        required_error: "Email is required",
    })
        .email(),
});
// @desc    Change email, which would require confirmation
// @route   POST /api/v1/auth/changeEmail
// @access  Protected
const changeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
    const newEmail = req.body.newEmail;
    const token = crypto_1.default.randomBytes(20).toString("hex");
    const hashedToken = crypto_1.default.createHash("sha256").update(token).digest("hex");
    yield Confirmation_1.default.create({
        user: user.toString(),
        type: Confirmation_1.CONFIRMATION_ENUM["EMAIL_UPDATE_CONFIRMATION"],
        token: hashedToken,
        newEmail,
    });
    const redirectUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/confirm/changeEmail/${token}`;
    const resObj = {
        message: "Confirmation email sent!",
    };
    yield (0, sendEmail_1.sendEmail)();
    if (process.env.NODE_ENV == "development") {
        resObj.redirectUrl = redirectUrl;
    }
    res.status(200).json(resObj);
});
exports.default = [(0, validate_request_1.validateRequest)(payloadSchema, "body"), changeEmail];
