class OrderStatusRepository {
  constructor({
    orderStatusModel,
  }) {
    this.orderStatusModel = orderStatusModel.sequelize();
  }

  count(opts) {
    return this.orderStatusModel.count(opts);
  }

  findById(id, opts) {
    return this.orderStatusModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.orderStatusModel.findOne(opts);
  }

  findAll(opts) {
    return this.orderStatusModel.findAll(opts);
  }

  create(data, transaction) {
    return this.orderStatusModel.create(data, { transaction });
  }

  update(id, data, transaction) {
    return this.orderStatusModel.update(data, {
      where: {
        id,
      },
      transaction,
    });
  }

  delete(id) {
    return this.orderStatusModel.destroy({
      where: { id },
    });
  }

}

module.exports = OrderStatusRepository;
