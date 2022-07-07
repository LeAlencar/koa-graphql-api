"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodesField = exports.nodeField = exports.nodeInterface = exports.registerTypeLoader = void 0;
const graphql_relay_1 = require("graphql-relay");
const getTypeRegister = () => {
    const typesLoaders = {};
    const getTypesLoaders = () => typesLoaders;
    const registerTypeLoader = (type, load) => {
        typesLoaders[type.name] = {
            type,
            load,
        };
        return type;
    };
    const idFetcher = (globalId, context) => {
        const { type, id } = (0, graphql_relay_1.fromGlobalId)(globalId);
        const { load } = typesLoaders[type] || { load: null };
        return (load && load(context, id)) || null;
    };
    const typeResolver = (obj) => {
        const { type } = typesLoaders[obj.constructor.name] || { type: null };
        return type;
    };
    const { nodeField, nodesField, nodeInterface } = (0, graphql_relay_1.nodeDefinitions)(idFetcher, typeResolver);
    return {
        registerTypeLoader,
        getTypesLoaders,
        nodeField,
        nodesField,
        nodeInterface,
    };
};
const { registerTypeLoader, nodeInterface, nodeField, nodesField } = getTypeRegister();
exports.registerTypeLoader = registerTypeLoader;
exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;
exports.nodesField = nodesField;
