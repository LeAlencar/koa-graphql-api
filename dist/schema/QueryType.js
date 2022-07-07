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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const connectionDefinitions_1 = require("../graphql/connectionDefinitions");
const typeRegister_1 = require("../modules/node/typeRegister");
const TransactionLoader = __importStar(require("../modules/transaction/TransactionLoader"));
const TransactionType_1 = require("../modules/transaction/TransactionType");
const QueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
        node: typeRegister_1.nodeField,
        nodes: typeRegister_1.nodesField,
        transactions: {
            type: new graphql_1.GraphQLNonNull(TransactionType_1.TransactionConnection.connectionType),
            args: Object.assign({}, connectionDefinitions_1.connectionArgs),
            resolve: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield TransactionLoader.loadAll(context, args); }),
        },
    }),
});
exports.default = QueryType;
