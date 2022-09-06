const Model = require('../../bootstrap/Model');
const Item = require('../Item/ItemModel');
const Customer = require('../Customer/CustomerModel');
const ExtraItemOrderedModel = require('../ExtraItemOrdered/ExtraItemOrderedModel');

class ItemOrdered extends Model {
  tableName = 'itemsOrdered';

  dataTypes = () => ({
    notes: this.DataTypes.TEXT,
    quantity: this.DataTypes.INTEGER,
    itemId: {
      type: this.DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: Item,
        key: 'id',
      },
    },
    customerId: {
      type: this.DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: Customer,
        key: 'id',
      },
    },
  });

  relationships = () => [
    {
      model: 'Item',
      relation: 'belongsTo',
      as: 'item',
      onDelete: 'CASCADE',
      foreignKey: 'itemId',
    },
    {
      model: 'Customer',
      relation: 'belongsTo',
      as: 'customer',
      onDelete: 'CASCADE',
      foreignKey: 'customerId',
    },
    {
      model: 'extra',
      relation: 'belongsToMany',
      as: 'extras',
      foreignKey: 'itemOrderedId',
      onDelete: 'CASCADE',
      through: new ExtraItemOrderedModel().sequelize(),
    },
  ];
}

module.exports = ItemOrdered;
