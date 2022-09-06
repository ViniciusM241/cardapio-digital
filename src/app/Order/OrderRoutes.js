const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/orders',
    method: 'post',
    action: 'create',
  },
  {
    path: '/orders/search',
    method: 'get',
    action: 'search',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/orders/:id',
    method: 'get',
    action: 'find',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/orders/:id/status',
    method: 'patch',
    action: 'updateStatus',
    beforeMiddlewares: [
      auth,
    ],
  },
];
