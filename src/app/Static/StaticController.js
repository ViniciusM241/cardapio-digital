class StaticController {
  constructor({
    staticService,

    Sequelize,
  }) {
    this.staticService = staticService;
    this.sequelize = Sequelize;
  }

  createFile(req, res, next) {
    return this.staticService.createFile(req, res, next);
  }

}

module.exports = StaticController;
