const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/wa-client/status',
    method: 'get',
    action: 'showStatus',
    beforeMiddlewares: [
      auth,
    ],
  },
  {
    path: '/wa-client/disconnect',
    method: 'get',
    action: 'disconnect',
    beforeMiddlewares: [
      auth,
    ],
  },
];
