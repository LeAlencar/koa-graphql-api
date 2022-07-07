"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const mutations_1 = __importDefault(require("../modules/transaction/mutations"));
exports.default = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    description: "Root of ... mutations",
    fields: () => (Object.assign({}, mutations_1.default)),
});
