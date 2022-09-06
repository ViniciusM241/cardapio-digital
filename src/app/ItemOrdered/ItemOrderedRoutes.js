const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/items-ordered',
    method: 'post',
    action: 'create',
  },
  {
    path: '/items-ordered/:id',
    method: 'get',
    action: 'find',
  },
  {
    path: '/items-ordered/:id',
    method: 'delete',
    action: 'delete',
  },
  {
    path: '/items-ordered/:id',
    method: 'put',
    action: 'update',
  },
];
