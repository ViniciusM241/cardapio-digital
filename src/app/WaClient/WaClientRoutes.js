const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/wa-cient/status',
    method: 'get',
    action: 'showStatus',
    beforeMiddlewares: [
      auth,
    ],
  },
];
