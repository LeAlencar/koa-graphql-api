"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const path_1 = __importDefault(require("path"));
const cwd = process.cwd();
const root = path_1.default.join.bind(cwd);
dotenv_safe_1.default.config({
    path: root(".env"),
    sample: root(".env.example"),
});
exports.config = {
    PORT: process.env.PORT || 9000,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI,
};
