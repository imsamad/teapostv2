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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_validation_error_1 = require("../lib/mongoose-validation-error");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Email is compulsory."],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    username: {
        type: String,
        // required: [true, "Username is compulsory."],
        // unique: true,
        // minlength: [4, "Username's minimum length must be 4."],
    },
    fullName: {
        type: String,
        required: [true, "Username is compulsory."],
    },
    password: {
        type: String,
        required: [true, "Password is compulsory."],
        minlength: [8, "Password's minimum length must be 8."],
        maxlength: [64, "Password's maximum length must be 64."],
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (_doc, ret) {
            ret.id = ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret._id;
        },
        virtuals: true,
    },
});
userSchema.method("matchPassword", function (enterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enterPassword, this.password);
    });
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        const saltFactor = Number(process.env.SALT_FACTOR) || 12;
        const salt = yield bcrypt_1.default.genSalt(saltFactor);
        user.password = bcrypt_1.default.hashSync(user.password, salt);
        next();
    });
});
userSchema.post("save", function postSaveErrorHandler(error, doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        next(new mongoose_validation_error_1.MongooseValidationError(error));
    });
});
// @ts-ignore
userSchema.query.isUserValid = function () {
    let docs = this;
    return docs.where({ isVerified: true, isBlocked: false });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
