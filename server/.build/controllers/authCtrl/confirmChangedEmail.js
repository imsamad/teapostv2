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
const Confirmation_1 = __importStar(require("../../models/Confirmation"));
const bad_request_error_1 = require("../../lib/bad-request-error");
const User_1 = __importDefault(require("../../models/User"));
// @desc    Confirm the new Emailuser wish to change to.
// @route   PUT /api/auth/confirm/changeEmail/:token
// @access  Public
const confirmChangedEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    const hashedVerifyToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const confirmation = yield Confirmation_1.default.findOne({
        token: hashedVerifyToken,
        type: Confirmation_1.CONFIRMATION_ENUM["EMAIL_UPDATE_CONFIRMATION"],
    });
    if (!confirmation)
        throw new bad_request_error_1.BadRequestError("Token expired, try again!");
    const user = yield User_1.default.findById(confirmation.user);
    if (!user)
        throw new bad_request_error_1.BadRequestError("Invalid operation!");
    user.isVerified = true;
    user.email = confirmation.newEmail;
    yield user.save();
    yield confirmation.deleteOne();
    res.json({
        message: "Confirmed successfully, log in from website!",
    });
});
exports.default = confirmChangedEmail;
