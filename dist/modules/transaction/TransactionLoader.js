"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAll = exports.load = exports.clearCache = exports.getLoader = void 0;
const graphql_mongo_helpers_1 = require("@entria/graphql-mongo-helpers");
const TransactionModel_1 = __importDefault(require("./TransactionModel"));
const TransactionFilterInputType_1 = require("./TransactionFilterInputType");
const loaderRegister_1 = require("../../graphql/loaderRegister");
const { Wrapper: Transaction, getLoader, clearCache, load, loadAll, } = (0, graphql_mongo_helpers_1.createLoader)({
    model: TransactionModel_1.default,
    loaderName: "TransactionLoader",
    filterMapping: TransactionFilterInputType_1.transactionFilterMapping,
});
exports.getLoader = getLoader;
exports.clearCache = clearCache;
exports.load = load;
exports.loadAll = loadAll;
exports.default = Transaction;
(0, loaderRegister_1.registerLoader)("TransactionLoader", getLoader);
