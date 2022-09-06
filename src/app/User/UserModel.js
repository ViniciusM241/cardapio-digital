const Model = require('../../bootstrap/Model');

class User extends Model {
  tableName = 'users';

  dataTypes = () => ({
    name: this.DataTypes.STRING,
    email: this.DataTypes.STRING,
    token: this.DataTypes.STRING,
  });

  relationships = () => [];
}

module.exports = User;
