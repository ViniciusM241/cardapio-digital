'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('extraItems', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      extraId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: { model: 'extras', key: 'id' },
      },
      itemId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('extraItems');
  }
};
