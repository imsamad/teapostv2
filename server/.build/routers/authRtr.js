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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authCtrls = __importStar(require("../controllers/authCtrl"));
const auth_1 = require("../middlewares/auth");
const authRouter = (0, express_1.default)();
authRouter.post([`/register`, `/signup`], authCtrls.register);
authRouter.post(`/confirm/registration/:token`, authCtrls.confirmRegistration);
authRouter.post(`/forgotPassword`, authCtrls.forgotPassword);
authRouter.post(`/confirm/resetPassword/:token`, authCtrls.resetPassword);
authRouter.post(`/changeEmail`, auth_1.requireAuth, authCtrls.changeEmail);
authRouter.post(`/confirm/changeEmail/:token`, authCtrls.confirmChangedEmail);
authRouter.post(`/login`, authCtrls.login);
authRouter.get(`/forgotIdentifier`, authCtrls.forgotIdentifier);
exports.default = authRouter;
