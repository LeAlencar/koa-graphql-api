"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    mongoose_1.default.connect("mongodb+srv://leandro:L34ndro123@cluster0.lozvw.mongodb.net/?retryWrites=true&w=majority");
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => console.log("Database connected ✅"));
};
exports.connectDB = connectDB;
