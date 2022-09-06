'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      deliveryMethod: Sequelize.ENUM('DELIVERY', 'TAKEOUT'),
      address: Sequelize.STRING,
      district: Sequelize.STRING,
      zipcode: Sequelize.STRING,
      number: Sequelize.STRING,
      paymentMethod: Sequelize.ENUM('PIX', 'CASH', 'CREDIT', 'DEBIT'),
      change: Sequelize.DECIMAL(15, 2),
      total: Sequelize.DECIMAL(15, 2),
      customerId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' },
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
    await queryInterface.dropTable('orders');
  }
};
