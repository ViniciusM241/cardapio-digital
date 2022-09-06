module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'items',
      'imageURL',
      {
        type: Sequelize.STRING,
        after: 'description',
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'items',
      'imageURL'
    );
  }
}
