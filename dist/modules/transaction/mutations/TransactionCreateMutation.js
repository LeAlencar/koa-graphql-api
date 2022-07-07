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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const graphql_mongo_helpers_1 = require("@entria/graphql-mongo-helpers");
const TransactionModel_1 = __importDefault(require("../TransactionModel"));
const TransactionLoader = __importStar(require("../TransactionLoader"));
const TransactionType_1 = __importDefault(require("../TransactionType"));
const mutation = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: 'TransactionCreate',
    description: "Create a new Transaction",
    inputFields: {
        transactionId: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
        },
        name: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        category: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        price: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        }
    },
    mutateAndGetPayload: ({ transactionId, name, category, price }) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield new TransactionModel_1.default({ transactionId, name, category, price }).save();
        if (!transaction) {
            return {
                error: 'Transaction not found',
            };
        }
        return {
            error: null,
            success: 'Transaction created \o/',
        };
    }),
    outputFields: Object.assign(Object.assign({ transaction: {
            type: TransactionType_1.default,
            resolve: ({ id }, _, context) => __awaiter(void 0, void 0, void 0, function* () {
                return yield TransactionLoader.load(context, id);
            }),
        } }, graphql_mongo_helpers_1.errorField), graphql_mongo_helpers_1.successField),
});
exports.default = mutation;
