class ParamRepository {
  constructor({
    paramModel,
  }) {
    this.paramModel = paramModel.sequelize();
  }

  findById(id, opts) {
    return this.paramModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.paramModel.findOne(opts);
  }

  findAll(opts) {
    return this.paramModel.findAll(opts);
  }

  create(data, transaction) {
    return this.paramModel.create(data, { transaction });
  }

  update(id, data, transaction) {
    return this.paramModel.update(data, {
      where: {
        id,
      },
      transaction,
    });
  }

  delete(id) {
    return this.paramModel.destroy({
      where: { id },
    });
  }

}

module.exports = ParamRepository;
