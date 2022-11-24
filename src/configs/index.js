const { asValue } = require('awilix');

const specialItemId = require('./specialItemId');

module.exports = (container) => {
  container.register({
    specialItemId: asValue(specialItemId),
  });
}
