module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('params',
    {
      deliveryFee: 5,
    }, {}),

  down: (queryInterface) => queryInterface.bulkDelete('params', null, {}),
};
