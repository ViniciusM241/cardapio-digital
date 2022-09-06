const auth = require("../../middlewares/auth");

module.exports = [
  {
    path: '/menu',
    method: 'get',
    action: 'show',
  },
];
