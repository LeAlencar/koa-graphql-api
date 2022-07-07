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
const loaderRegister_1 = require("./graphql/loaderRegister");
const koa_1 = __importDefault(require("koa"));
const koa_graphql_1 = require("koa-graphql");
const koa_router_1 = __importDefault(require("koa-router"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const schema_1 = require("./schema/schema");
const graphql_playground_middleware_koa_1 = __importDefault(require("graphql-playground-middleware-koa"));
const app = new koa_1.default();
const router = new koa_router_1.default();
const graphqlSettingsPerReq = (req, ctx, koaContext) => __awaiter(void 0, void 0, void 0, function* () {
    const { transaction } = koaContext;
    const dataloaders = (0, loaderRegister_1.getDataloaders)();
    return {
        graphiql: true,
        schema: schema_1.schema,
        context: {
            transaction,
            req,
            dataloaders,
        },
        customFormatErrorFn: (error) => {
            console.log(error.message);
            console.log(error.locations);
            console.log(error.stack);
            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack,
            };
        },
    };
});
const graphqlServer = (0, koa_graphql_1.graphqlHTTP)(graphqlSettingsPerReq);
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = 'Welcome koa server (~˘▾˘)~';
}));
router.all('/graphql', graphqlServer);
router.all('/playground', (0, graphql_playground_middleware_koa_1.default)({
    endpoint: '/graphql',
}));
app.use((0, koa_bodyparser_1.default)());
app.use((0, cors_1.default)());
app.use(router.routes()).use(router.allowedMethods());
exports.default = app;
