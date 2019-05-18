
import Router from 'koa-router';
import url from 'url';
import querystring from 'querystring';
import findData from '../src/utils/findData';


export default (router, io) => {
  const store = {
    byId: {
      1: { id: 1, name: 'AAA', value: 1.02 },
      2: { id: 2, name: 'AAB', value: 1.5 },
      3: { id: 3, name: 'AAC', value: 2 },
      4: { id: 4, name: 'AAD', value: 2 },
      5: { id: 5, name: 'AAE', value: 1.9 },
      6: { id: 6, name: 'AAF', value: 1.53 },
      7: { id: 7, name: 'AAG', value: 1.53 },
      8: { id: 8, name: 'AAH', value: 1.46 },
      9: { id: 9, name: 'AAI', value: 1.01 },
      10: { id: 10, name: 'AAJ', value: 1.08 },
    },
    allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  const apiRouter = new Router();
  apiRouter
    .get('/data', (ctx) => {
      const { body } = ctx.request;
      const { query } = url.parse(ctx.request.url);
      const { id, value, name, page, perPage } = querystring.parse(query);
      //console.log(id, value, name, page, perPage);
      //findData(store, ctx.request.body);

      ctx.body = { id, value, name, page, perPage };//findData(store, ctx.request.body);
    });
  return router
    .get('/', (ctx) => {
      ctx.render('index', { gon: store });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
