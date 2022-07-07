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
const database_1 = require("./database/database");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    try {
        (0, database_1.connectDB)();
    }
    catch (error) {
        console.error("Unable to connect to database");
        process.exit(1);
    }
    const server = (0, http_1.createServer)(app_1.default.callback());
    server.listen(process.env.PORT, () => console.log('Server running 🚀'));
    console.log(`GraphQL Server is now running on http://localhost:${process.env.PORT}/graphql`);
}))();
