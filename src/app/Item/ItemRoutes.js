const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/items',
    method: 'post',
    action: 'create',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/items',
    method: 'get',
    action: 'show',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/items/:id',
    method: 'get',
    action: 'find',
  },
  {
    path: '/items/:id',
    method: 'delete',
    action: 'delete',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/items/:id',
    method: 'put',
    action: 'update',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/items/:id/extras',
    method: 'get',
    action: 'getExtras',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/items/:id/extras',
    method: 'put',
    action: 'setExtras',
    beforeMiddlewares: [
      auth,
    ],
  },
];
