
import Router from 'koa-router';
import url from 'url';
import querystring from 'querystring';
import findData from '../src/utils/findData';


export default (router) => {
  const store = [
    { id: 1, name: 'AAA', value: 1.02 },
    { id: 2, name: 'AAB', value: 1.5 },
    { id: 3, name: 'AAC', value: 2 },
    { id: 4, name: 'AAD', value: 2 },
    { id: 5, name: 'AAE', value: 1.9 },
    { id: 6, name: 'AAF', value: 1.53 },
    { id: 7, name: 'AAG', value: 1.53 },
    { id: 8, name: 'AAH', value: 1.46 },
    { id: 9, name: 'AAI', value: 1.01 },
    { id: 10, name: 'AAJ', value: 1.08 },
  ];

  const apiRouter = new Router();
  apiRouter
    .get('/data', (ctx) => {
      const { query } = url.parse(ctx.request.url);
      const {
        id, value, name, page, perPage,
      } = querystring.parse(query);
      console.log(id.length);

      /*
      id приходит как строка. я не хочу использовать ==,
      поэтому для сравнения привожу String к Number
      */
      const filteredById = id.length === 0 ? store : store.filter(i => i.id === +id);

      /* при фильтрации по value убрал различие между строчными и заглавными буквами */
      const filteredByName = name.length === 0 ? filteredById : filteredById.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));
      ctx.body = filteredByName;
    });
  return router
    .get('/', (ctx) => {
      ctx.render('index', { gon: store });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
