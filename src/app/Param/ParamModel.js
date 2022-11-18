const Model = require('../../bootstrap/Model');

class Param extends Model {
  tableName = 'params';

  dataTypes = () => ({
    deliveryFee: this.DataTypes.DECIMAL(15, 2),
    businessNumber: this.DataTypes.STRING,
    takeoutTime: this.DataTypes.INTEGER,
    deliveryTime: this.DataTypes.INTEGER,
    pix: this.DataTypes.STRING,
  });

  relationships = () => [
  ];
}

module.exports = Param;
