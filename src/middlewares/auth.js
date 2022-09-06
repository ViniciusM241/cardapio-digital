const jwt = require('jsonwebtoken');
const Error = require('../bootstrap/Error');
const UserModel = require('../app/User/UserModel');

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) next(new Error('no token provided', 401));

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    try {
      if (err) throw new Error('Invalid token', 401);

      const userModel = new UserModel().sequelize();
      const user = await userModel.findByPk(decoded.userId, { raw: true });

      if (!user) throw new Error('User not found', 401);

      req.user = user;

      next();
    } catch(err) {
      next(err);
    }
  });
}

module.exports = auth;
