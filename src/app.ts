import { getDataloaders } from './graphql/loaderRegister';

import Koa from 'koa';
import { graphqlHTTP } from 'koa-graphql';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import { schema } from './schema/schema';

import koaPlayground from 'graphql-playground-middleware-koa';

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async (req: any, ctx: any, koaContext: any) => {
  const { transaction } = koaContext;
  const dataloaders = getDataloaders();

  return {
    graphiql: true,
    schema,
    context: {
      transaction,
      req,
      dataloaders,
    },
    customFormatErrorFn: (error: any) => {
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
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

router.get('/', async ctx => {
  ctx.body = 'Welcome koa server (~˘▾˘)~';
});

router.all('/graphql', graphqlServer);

router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql',
  }),
);

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;
