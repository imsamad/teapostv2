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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "1.2.3.4",
        port: 465,
        secure: true,
        auth: {
            user: "",
            pass: "",
        },
    });
    try {
        const info = yield transporter.sendMail({
            from: "Confirmation <>",
            to: "",
            subject: "Subject",
            html: `
      <html>
      <body>
      <h1>Heading 1</h1>
      </body>
      </html>
      `,
        });
        console.log(info);
        return true;
    }
    catch (err) {
        console.log("err: ", err);
        return false;
    }
});
exports.sendEmail = sendEmail;
