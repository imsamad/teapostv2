"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const not_found_mdlwr_1 = require("./middlewares/not-found-mdlwr");
const error_handler_mdlwr_1 = require("./middlewares/error-handler-mdlwr");
const routers_1 = __importDefault(require("./routers"));
const error_logger_1 = require("./middlewares/error-logger");
const auth_1 = require("./middlewares/auth");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, cors_1.default)({
    origin: (_a = process.env.CORS_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(","),
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(auth_1.currentUser);
app.use("/api/v1/", routers_1.default);
app.use(() => {
    throw new not_found_mdlwr_1.NotFoundErrorMdlwr();
});
app.use(error_logger_1.errorLogger);
app.use(error_handler_mdlwr_1.errorHandler);
