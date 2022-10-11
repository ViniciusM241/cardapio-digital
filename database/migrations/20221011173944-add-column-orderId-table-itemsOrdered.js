module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'itemsOrdered',
      'orderId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        after: 'itemId',
      }
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'itemsOrdered',
      'orderId'
    );
  }
}
