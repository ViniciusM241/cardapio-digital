const Model = require('../../bootstrap/Model');

class Category extends Model {
  tableName = 'categories';

  dataTypes = () => ({
    name: this.DataTypes.STRING,
  });

  relationships = () => [
    {
      model: 'Item',
      relation: 'hasMany',
      as: 'items',
      foreignKey: 'categoryId',
    },
  ];
}

module.exports = Category;
