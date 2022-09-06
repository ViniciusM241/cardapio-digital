class CategoryRepository {
  constructor({
    categoryModel,
  }) {
    this.categoryModel = categoryModel.sequelize();
  }

  findById(id, opts) {
    return this.categoryModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.categoryModel.findOne(opts);
  }

  findAll(opts) {
    return this.categoryModel.findAll(opts);
  }

  create(data) {
    return this.categoryModel.create(data);
  }

  update(id, data) {
    return this.categoryModel.update(data, {
      where: {
        id,
      },
    });
  }

  delete(id) {
    return this.categoryModel.destroy({
      where: { id },
    });
  }

}

module.exports = CategoryRepository;
