"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("./server");
const PORT = process.env.PORT || 400;
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default.connect(MONGO_URI).then(() => {
    server_1.app.listen(PORT, () => {
        console.log(`Listining on port ${PORT}`);
    });
});
