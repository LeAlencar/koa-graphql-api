"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionCreateMutation_1 = __importDefault(require("./TransactionCreateMutation"));
const TransactionDeleteMutation_1 = __importDefault(require("./TransactionDeleteMutation"));
const TransactionUpdateMutation_1 = __importDefault(require("./TransactionUpdateMutation"));
exports.default = { TransactionCreate: TransactionCreateMutation_1.default, TransactionDelete: TransactionDeleteMutation_1.default, TransactionUpdate: TransactionUpdateMutation_1.default };
