class ExtraItemOrderedRepository {
  constructor({
    extraItemOrderedModel,
  }) {
    this.extraItemOrderedModel = extraItemOrderedModel.sequelize();
  }

  findById(id, opts) {
    return this.extraItemOrderedModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.extraItemOrderedModel.findOne(opts);
  }

  findAll(opts) {
    return this.extraItemOrderedModel.findAll(opts);
  }

  create(data, transaction) {
    return this.extraItemOrderedModel.create(data, { transaction });
  }

  update(id, data) {
    return this.extraItemOrderedModel.update(data, {
      where: {
        id,
      },
    });
  }

  delete(opts) {
    return this.extraItemOrderedModel.destroy(opts);
  }

}

module.exports = ExtraItemOrderedRepository;
