const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/reports',
    method: 'get',
    action: 'show',
    beforeMiddlewares: [
      auth,
    ],
  },
];
