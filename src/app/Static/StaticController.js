class StaticController {
  constructor({
    staticService,

    Sequelize,
  }) {
    this.staticService = staticService;
    this.sequelize = Sequelize;
  }

  createFile(req, res) {
    return this.staticService.createFile(req, res);
  }

}

module.exports = StaticController;
