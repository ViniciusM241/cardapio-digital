const Model = require('../../bootstrap/Model');

class ExtraItemOrderedModel extends Model {
  tableName = 'extraItemsOrdered';

  dataTypes = () => ({
    quantity: this.DataTypes.INTEGER,
    itemOrderedId: {
      type: this.DataTypes.INTEGER,
      onDelete: 'CASCADE',
    },
    extraId: {
      type: this.DataTypes.INTEGER,
      onDelete: 'CASCADE',
    },
  });

  relationships = () => [
  ];
}

module.exports = ExtraItemOrderedModel;
