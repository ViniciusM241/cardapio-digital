'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('extraItemsOrdered', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantity: Sequelize.INTEGER,
      extraId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: { model: 'extras', key: 'id' },
      },
      itemOrderedId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: { model: 'itemsOrdered', key: 'id' },
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
    await queryInterface.dropTable('extraItemsOrdered');
  }
};
