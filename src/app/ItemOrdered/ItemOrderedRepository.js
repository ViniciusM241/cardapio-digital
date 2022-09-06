class CategoryRepository {
  constructor({
    itemOrderedModel,
  }) {
    this.itemOrderedModel = itemOrderedModel.sequelize();
  }

  findById(id, opts) {
    return this.itemOrderedModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.itemOrderedModel.findOne(opts);
  }

  findAll(opts) {
    return this.itemOrderedModel.findAll(opts);
  }

  create(data, transaction) {
    return this.itemOrderedModel.create(data, { transaction });
  }

  update(id, data, transaction) {
    return this.itemOrderedModel.update(data, {
      where: {
        id,
      },
      transaction,
    });
  }

  delete(id) {
    return this.itemOrderedModel.destroy({
      where: { id },
    });
  }

}

module.exports = CategoryRepository;
