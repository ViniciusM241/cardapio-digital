const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/categories',
    method: 'post',
    action: 'create',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/categories',
    method: 'get',
    action: 'show',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/categories/:id',
    method: 'get',
    action: 'find',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/categories/:id',
    method: 'delete',
    action: 'delete',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/categories/:id',
    method: 'put',
    action: 'update',
    beforeMiddlewares: [
      auth,
    ],
  },
];
