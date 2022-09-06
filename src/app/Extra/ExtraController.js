class ExtraController {
  constructor({
    extraService,
  }) {
    this.extraService = extraService;
  }

  async show(req, res) {
    const extras = await this.extraService.getExtras();

    return res.status(200).json(extras);
  }

  async find(req, res) {
    const id = req.params.id;
    const extra = await this.extraService.getExtraById(id);

    return res.status(200).json(extra);
  }

  async create(req, res) {
    const body = req.body;
    const extra = await this.extraService.createExtra(body);

    return res.status(201).json(extra);
  }

  async delete(req, res) {
    const id = req.params.id;
    await this.extraService.deleteById(id);

    return res.status(204).json();
  }

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;

    await this.extraService.updateExtra(id, body);

    return res.status(204).json();
  }

}

module.exports = ExtraController;
