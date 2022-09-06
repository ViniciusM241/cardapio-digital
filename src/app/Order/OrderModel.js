const Model = require('../../bootstrap/Model');
const Customer = require('../Customer/CustomerModel');
const deliveryMethodsEnum = require('../../utils/enums/deliveryMethods');
const paymentMethodsEnum = require('../../utils/enums/paymentMethods');

class Order extends Model {
  tableName = 'orders';

  dataTypes = () => ({
    deliveryMethod: this.DataTypes.ENUM(deliveryMethodsEnum.keys),
    address: this.DataTypes.STRING,
    district: this.DataTypes.STRING,
    zipcode: this.DataTypes.STRING,
    number: this.DataTypes.STRING,
    paymentMethod: this.DataTypes.ENUM(paymentMethodsEnum.keys),
    change: this.DataTypes.DECIMAL(15, 2),
    total: this.DataTypes.DECIMAL(15, 2),
    customerId: {
      type: this.DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: Customer,
        key: 'id',
      },
    }
  });

  relationships = () => [
    {
      model: 'Customer',
      relation: 'belongsTo',
      as: 'customer',
      onDelete: 'CASCADE',
      foreignKey: 'customerId',
    },
    {
      model: 'OrderStatus',
      relation: 'hasMany',
      as: 'ordersStatus',
      foreignKey: 'orderId',
    },
  ];
}

module.exports = Order;
