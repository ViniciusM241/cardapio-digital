class StaticController {
  constructor({
    reportService,

    Sequelize,
  }) {
    this.reportService = reportService;
    this.sequelize = Sequelize;
  }

  async show(req, res) {
    const query = req.query;
    const reports = await this.reportService.getReports(query);

    return res.status(200).json(reports);
  }

}

module.exports = StaticController;
