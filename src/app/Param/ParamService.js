class ParamService {
  constructor({
    Error,
    Sequelize,
  }) {
    this.sequelize = Sequelize;
    this.Error = Error;
  }

}

module.exports = ParamService;
