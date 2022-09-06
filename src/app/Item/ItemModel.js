const Model = require('../../bootstrap/Model');
const Category = require('../Category/CategoryModel');
const ExtraItem = require('../ExtraItem/ExtraItemModel');

class Item extends Model {
  tableName = 'items';

  dataTypes = () => ({
    name: this.DataTypes.STRING,
    description: this.DataTypes.STRING,
    imageURL: this.DataTypes.STRING,
    value: this.DataTypes.DECIMAL(15, 2),
    categoryId: {
      type: this.DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: Category,
        key: 'id',
      },
    }
  });

  relationships = () => [
    {
      model: 'Category',
      relation: 'belongsTo',
      as: 'category',
      onDelete: 'CASCADE',
      foreignKey: 'categoryId',
    },
    {
      model: 'extra',
      relation: 'belongsToMany',
      as: 'extras',
      foreignKey: 'itemId',
      onDelete: 'CASCADE',
      through: new ExtraItem().sequelize(),
    },
  ];
}

module.exports = Item;
