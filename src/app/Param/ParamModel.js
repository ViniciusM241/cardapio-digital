const Model = require('../../bootstrap/Model');

class Param extends Model {
  tableName = 'params';

  dataTypes = () => ({
    deliveryFee: this.DataTypes.DECIMAL(15, 2),
  });

  relationships = () => [
  ];
}

module.exports = Param;
