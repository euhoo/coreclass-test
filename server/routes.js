
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
        id, minValue, maxValue, name, page, perPage,
      } = querystring.parse(query);
      console.log(id.length);

      /*
      id приходит как строка. я не хочу использовать ==,
      поэтому для сравнения привожу String к Number
      */
      const filteredById = id.length === 0 ? store : store.filter(i => i.id === +id);

      /* при фильтрации по value убрал различие между строчными и заглавными буквами */
      const filteredByName = name.length === 0 ? filteredById : filteredById.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));

      const filteredByMinValue = minValue.length === 0 ? filteredByName : filteredByName.filter(i => i.value >= minValue);
      const filteredByMaxValue = maxValue.length === 0 ? filteredByMinValue : filteredByMinValue.filter(i => i.value <= maxValue);
      const findNewPerPage = (oldPerPage, currentStore) => {
        if (oldPerPage.length === 0) return currentStore.length;
        if (oldPerPage <= 0 || oldPerPage > currentStore.length) return currentStore.length;
        return oldPerPage;
      };
      const newPerPage = findNewPerPage(perPage, filteredByMaxValue);
      const numberOfPages = Math.ceil(filteredByMaxValue.length / newPerPage);
      const findNewPage = (oldPage) => {
        if (oldPage.length === 0) return 1;
        if (oldPage <= 0 || oldPage > numberOfPages) return 1;
        return oldPage;
      };
      
      const newPage = findNewPage(page, filteredByMaxValue);
      

      const minElIndex = (newPage - 1) * newPerPage;
      const maxElIndex = newPage * newPerPage;
      console.log(minElIndex, maxElIndex);
      const result = filteredByMaxValue.filter((item, index) => (index >= minElIndex && index < maxElIndex));
      ctx.body = { store: result, page: newPage, perPage: newPerPage };
    });
  return router
    .get('/', (ctx) => {
      ctx.render('index', { gon: store });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
