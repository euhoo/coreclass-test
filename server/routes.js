import _ from 'lodash';
import Router from 'koa-router';

const getNextId = () => Number(_.uniqueId());

export default (router, io) => {
  const generalChannelId = getNextId();
  const randomChannelId = getNextId();
  const defaultState = {
    channels: [
      { id: generalChannelId, name: 'general', removable: false },
      { id: randomChannelId, name: 'random', removable: false },
    ],
    messages: [],
    currentChannelId: generalChannelId,
  };

  const state = { ...defaultState };

  const apiRouter = new Router();
  apiRouter
    .get('/channels', (ctx) => {
      ctx.body = state.channels;
      ctx.status = 301;
      // io.emit('newChannel', data);
    });
  return router
    .get('root', '/', (ctx) => {
      ctx.render('index', { gon: state });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
