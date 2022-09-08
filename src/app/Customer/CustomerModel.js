const Model = require('../../bootstrap/Model');

class Customer extends Model {
  tableName = 'customers';

  dataTypes = () => ({
    name: this.DataTypes.STRING,
    phone: this.DataTypes.STRING,
  });

  relationships = () => [
    {
      model: 'Order',
      relation: 'hasMany',
      as: 'orders',
      foreignKey: 'customerId',
    },
  ];
}

module.exports = Customer;
