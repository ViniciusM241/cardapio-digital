'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ordersStatus', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      status: Sequelize.ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'WAITINGTAKEOUT', 'FINISHED'),
      orderId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: { model: 'orders', key: 'id' },
      },
      userId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ordersStatus');
  }
};
