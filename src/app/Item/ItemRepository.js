class CategoryRepository {
  constructor({
    itemModel,
  }) {
    this.itemModel = itemModel.sequelize();
  }

  findById(id, opts) {
    return this.itemModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.itemModel.findOne(opts);
  }

  findAll(opts) {
    return this.itemModel.findAll(opts);
  }

  create(data, transaction) {
    return this.itemModel.create(data, { transaction });
  }

  update(id, data, transaction) {
    return this.itemModel.update(data, {
      where: {
        id,
      },
      transaction,
    });
  }

  delete(id) {
    return this.itemModel.destroy({
      where: { id },
    });
  }

}

module.exports = CategoryRepository;
