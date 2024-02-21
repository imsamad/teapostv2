"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIRMATION_ENUM = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var CONFIRMATION_ENUM;
(function (CONFIRMATION_ENUM) {
    CONFIRMATION_ENUM["REGISTRATION_CONFIRM"] = "REGISTRATION_CONFIRM";
    CONFIRMATION_ENUM["EMAIL_UPDATE_CONFIRMATION"] = "EMAIL_UPDATE_CONFIRMATION";
    CONFIRMATION_ENUM["RESET_PASSWORD"] = "RESET_PASSWORD";
})(CONFIRMATION_ENUM || (exports.CONFIRMATION_ENUM = CONFIRMATION_ENUM = {}));
const confirmationSchema = new mongoose_1.default.Schema({
    // @ts-ignore
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "It is requried to mention user"],
    },
    type: {
        type: String,
        enum: CONFIRMATION_ENUM,
    },
    token: String,
    newEmail: String,
}, {
    timestamps: true,
});
const Confirmation = mongoose_1.default.model("Confirmation", confirmationSchema);
exports.default = Confirmation;
