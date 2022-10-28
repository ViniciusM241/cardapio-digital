const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/users',
    method: 'post',
    action: 'create',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/users',
    method: 'get',
    action: 'show',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/profile',
    method: 'get',
    action: 'profile',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/users/:id',
    method: 'get',
    action: 'find',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/users/:id',
    method: 'patch',
    action: 'update',
    beforeMiddlewares: [
      auth,
    ],
  },
];
