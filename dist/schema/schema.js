"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const QueryType_1 = __importDefault(require("./QueryType"));
const MutationType_1 = __importDefault(require("./MutationType"));
exports.schema = new graphql_1.GraphQLSchema({
    query: QueryType_1.default,
    mutation: MutationType_1.default,
});
