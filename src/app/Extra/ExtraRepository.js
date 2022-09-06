class ExtraRepository {
  constructor({
    extraModel,
  }) {
    this.extraModel = extraModel.sequelize();
  }

  findById(id, opts) {
    return this.extraModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.extraModel.findOne(opts);
  }

  findAll(opts) {
    return this.extraModel.findAll(opts);
  }

  create(data) {
    return this.extraModel.create(data);
  }

  update(id, data) {
    return this.extraModel.update(data, {
      where: {
        id,
      },
    });
  }

  delete(id) {
    return this.extraModel.destroy({
      where: { id },
    });
  }

}

module.exports = ExtraRepository;
