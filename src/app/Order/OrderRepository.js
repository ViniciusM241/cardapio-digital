class OrderRepository {
  constructor({
    orderModel,
  }) {
    this.orderModel = orderModel.sequelize();
  }

  count(opts) {
    return this.orderModel.count(opts);
  }

  findById(id, opts) {
    return this.orderModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.orderModel.findOne(opts);
  }

  findAll(opts) {
    return this.orderModel.findAll(opts);
  }

  create(data, transaction) {
    return this.orderModel.create(data, { transaction });
  }

  update(id, data, transaction) {
    return this.orderModel.update(data, {
      where: {
        id,
      },
      transaction,
    });
  }

  delete(id) {
    return this.orderModel.destroy({
      where: { id },
    });
  }

}

module.exports = OrderRepository;
