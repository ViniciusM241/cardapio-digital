class ExtraItemRepository {
  constructor({
    extraItemModel,
  }) {
    this.extraItemModel = extraItemModel.sequelize();
  }

  findById(id, opts) {
    return this.extraItemModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.extraItemModel.findOne(opts);
  }

  findAll(opts) {
    return this.extraItemModel.findAll(opts);
  }

  create(data, transaction) {
    return this.extraItemModel.create(data, { transaction });
  }

  update(id, data) {
    return this.extraItemModel.update(data, {
      where: {
        id,
      },
    });
  }

  delete(opts) {
    return this.extraItemModel.destroy(opts);
  }

}

module.exports = ExtraItemRepository;
