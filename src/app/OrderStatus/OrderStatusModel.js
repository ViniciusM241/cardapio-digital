const Model = require('../../bootstrap/Model');
const Order = require('../Order/OrderModel');
const User = require('../User/UserModel');
const orderStatusEnum = require('../../utils/enums/orderStatus');

class OrderStatus extends Model {
  tableName = 'ordersStatus';

  dataTypes = () => ({
    status: this.DataTypes.ENUM(orderStatusEnum.keys),
    orderId: {
      type: this.DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: Order,
        key: 'id',
      },
    },
    userId: {
      type: this.DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: User,
        key: 'id',
      },
    },
  });

  relationships = () => [
    {
      model: 'Order',
      relation: 'belongsTo',
      as: 'order',
      onDelete: 'CASCADE',
      foreignKey: 'orderId',
    },
    {
      model: 'User',
      relation: 'belongsTo',
      as: 'user',
      onDelete: 'CASCADE',
      foreignKey: 'userId',
    },
  ];
}

module.exports = OrderStatus;
