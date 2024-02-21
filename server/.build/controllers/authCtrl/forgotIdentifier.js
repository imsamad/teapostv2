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
const User_1 = __importDefault(require("../../models/User"));
// @desc    In case client forget its username or email, send back related matching email or username
// @route   GET /api/auth/forgotIdentifier
// @access  Public
const forgotIdentifier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const identifierInitials = req.params.identifierInitials;
    const users = yield User_1.default.find({
        $or: [
            { email: new RegExp(identifierInitials, "gi") },
            { username: new RegExp(identifierInitials, "gi") },
        ],
        // @ts-ignore
    }).isUserValid();
    res.json(users.map(({ email, username }) => ({ email, username })));
});
exports.default = forgotIdentifier;
