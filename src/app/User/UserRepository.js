class UserRepository {
  constructor({
    userModel,
  }) {
    this.userModel = userModel.sequelize();
  }

  findById(id, opts) {
    return this.userModel.findByPk(id, opts);
  }

  findOne(opts) {
    return this.userModel.findOne(opts);
  }

  findAll(opts) {
    return this.userModel.findAll(opts);
  }

  create(data) {
    return this.userModel.create(data);
  }

  update(id, data) {
    return this.userModel.update(data, {
      where: {
        id,
      },
    });
  }

}

module.exports = UserRepository;
