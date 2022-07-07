"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDefinitions = exports.connectionArgs = exports.backwardConnectionArgs = exports.forwardConnectionArgs = void 0;
const graphql_1 = require("graphql");
exports.forwardConnectionArgs = {
    after: {
        type: graphql_1.GraphQLString,
    },
    first: {
        type: graphql_1.GraphQLInt,
    },
};
exports.backwardConnectionArgs = {
    before: {
        type: graphql_1.GraphQLString,
    },
    last: {
        type: graphql_1.GraphQLInt,
    },
};
exports.connectionArgs = Object.assign(Object.assign({}, exports.forwardConnectionArgs), exports.backwardConnectionArgs);
const pageInfoType = new graphql_1.GraphQLObjectType({
    name: "PageInfoExtended",
    description: "Information about pagination in a connection.",
    fields: () => ({
        hasNextPage: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
            description: "When paginating forwards, are there more items?",
        },
        hasPreviousPage: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
            description: "When paginating backwards, are there more items?",
        },
        startCursor: {
            type: graphql_1.GraphQLString,
            description: "When paginating backwards, the cursor to continue.",
        },
        endCursor: {
            type: graphql_1.GraphQLString,
            description: "When paginating forwards, the cursor to continue.",
        },
    }),
});
function resolveMaybeThunk(thingOrThunk) {
    return typeof thingOrThunk === "function"
        ? thingOrThunk()
        : thingOrThunk;
}
function connectionDefinitions(config) {
    const { nodeType, resolveCursor, resolveNode } = config;
    const name = config.name || nodeType.name;
    const edgeFields = config.edgeFields || {};
    const connectionFields = config.connectionFields || {};
    const edgeType = new graphql_1.GraphQLObjectType({
        name: `${name}Edge`,
        description: "An edge in a connection.",
        fields: () => (Object.assign({ node: {
                type: nodeType,
                resolve: resolveNode,
                description: "The item at the end of the edge",
            }, cursor: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                resolve: resolveCursor,
                description: "A cursor for use in pagination",
            } }, resolveMaybeThunk(edgeFields))),
    });
    const connectionType = new graphql_1.GraphQLObjectType({
        name: `${name}Connection`,
        description: "A connection to a list of items.",
        fields: () => (Object.assign({ count: {
                type: graphql_1.GraphQLInt,
                description: "Number of items in this connection",
            }, totalCount: {
                type: graphql_1.GraphQLInt,
                resolve: (connection) => connection.count,
                description: `A count of the total number of objects in this connection, ignoring pagination.
  This allows a client to fetch the first five objects by passing "5" as the
  argument to "first", then fetch the total count so it could display "5 of 83",
  for example.`,
            }, startCursorOffset: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                description: "Offset from start",
            }, endCursorOffset: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                description: "Offset till end",
            }, pageInfo: {
                type: new graphql_1.GraphQLNonNull(pageInfoType),
                description: "Information to aid in pagination.",
            }, edges: {
                type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(edgeType)),
                description: "A list of edges.",
            } }, resolveMaybeThunk(connectionFields))),
    });
    return { edgeType, connectionType };
}
exports.connectionDefinitions = connectionDefinitions;
