class CustomerRepository {
  constructor({
    customerModel,
  }) {
    this.customerModel = customerModel.sequelize();
  }

  findById(id, opts) {
    return this.customerModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.customerModel.findOne(opts);
  }

  findAll(opts) {
    return this.customerModel.findAll(opts);
  }

  create(data) {
    return this.customerModel.create(data);
  }

  count(options) {
    return this.customerModel.count(options);
  }

  update(id, data) {
    return this.customerModel.update(data, {
      where: {
        id,
      },
    });
  }

  delete(id) {
    return this.customerModel.destroy({
      where: { id },
    });
  }

}

module.exports = CustomerRepository;
