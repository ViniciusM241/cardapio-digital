class ParamController {
  constructor({
    paramService,

    Sequelize,
  }) {
    this.paramService = paramService;
    this.sequelize = Sequelize;
  }

  async show(req, res) {
    const params = await this.paramService.show();

    return res.status(200).json(params);
  }

  async update(req, res) {
    const body = req.body;

    await this.paramService.update(body);

    return res.status(201).json({});
  }

}

module.exports = ParamController;
