const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/customers',
    method: 'post',
    action: 'create',
  },
  {
    path: '/customers',
    method: 'get',
    action: 'show',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/customers/:id',
    method: 'get',
    action: 'find',
  },
  {
    path: '/customers/:id',
    method: 'delete',
    action: 'delete',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/customers/:id',
    method: 'put',
    action: 'update',
  },
];
