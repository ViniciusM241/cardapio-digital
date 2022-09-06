'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('itemsOrdered', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'customers', key: 'id' },
      },
      itemId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'items', key: 'id' },
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
    await queryInterface.dropTable('itemsOrdered');
  }
};
