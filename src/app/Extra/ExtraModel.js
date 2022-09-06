const Model = require('../../bootstrap/Model');
const ExtraItemOrderedModel = require('../ExtraItemOrdered/ExtraItemOrderedModel');
const ExtraItem = require('../ExtraItem/ExtraItemModel');

class Extra extends Model {
  tableName = 'extras';

  dataTypes = () => ({
    name: this.DataTypes.STRING,
    value: this.DataTypes.DECIMAL(15, 2),
  });

  relationships = () => [
    {
      model: 'item',
      relation: 'belongsToMany',
      as: 'items',
      foreignKey: 'extraId',
      onDelete: 'CASCADE',
      through: new ExtraItem().sequelize(),
    },
    {
      model: 'itemOrdered',
      relation: 'belongsToMany',
      as: 'itemsOrdered',
      foreignKey: 'extraId',
      onDelete: 'CASCADE',
      through: new ExtraItemOrderedModel().sequelize(),
    },
  ];
}

module.exports = Extra;
