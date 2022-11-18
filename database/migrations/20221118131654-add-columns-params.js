module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return Promise.all([
      queryInterface.addColumn(
        'params',
        'deliveryTime',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          after: 'deliveryFee',
        }
      ),
      queryInterface.addColumn(
        'params',
        'takeoutTime',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          after: 'deliveryFee',
        }
      ),
      queryInterface.addColumn(
        'params',
        'businessNumber',
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: 'deliveryFee',
        }
      ),
      queryInterface.addColumn(
        'params',
        'pix',
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: 'deliveryFee',
        }
      ),
    ]);
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn(
        'params',
        'deliveryTime'
      ),
      queryInterface.removeColumn(
        'params',
        'takeoutTime'
      ),
      queryInterface.removeColumn(
        'params',
        'businessNumber'
      ),
      queryInterface.removeColumn(
        'params',
        'pix'
      ),
    ]);
  }
}
