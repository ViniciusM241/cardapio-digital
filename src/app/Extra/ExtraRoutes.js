const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/extras',
    method: 'post',
    action: 'create',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/extras',
    method: 'get',
    action: 'show',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/extras/:id',
    method: 'get',
    action: 'find',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/extras/:id',
    method: 'delete',
    action: 'delete',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/extras/:id',
    method: 'put',
    action: 'update',
    beforeMiddlewares: [
      auth,
    ],
  },
];
