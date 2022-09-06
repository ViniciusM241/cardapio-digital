const Model = require('../../bootstrap/Model');

class ExtraItem extends Model {
  tableName = 'extraItems';

  dataTypes = () => ({
    itemId: {
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

module.exports = ExtraItem;
