class ItemOrderedController {
  constructor({
    itemOrderedService,

    Sequelize,
  }) {
    this.itemOrderedService = itemOrderedService;
    this.sequelize = Sequelize;
  }

  async find(req, res) {
    const id = req.params.id;
    const itemOrdered = await this.itemOrderedService.findById(id);

    return res.status(200).json(itemOrdered);
  }

  async create(req, res, next) {
    const transaction = await this.sequelize.transaction();

    try {
      const body = req.body;
      const itemOrdered = await this.itemOrderedService.create(body, transaction);

      transaction.commit();

      return res.status(201).json(itemOrdered);
    } catch (err) {
      console.log(err);
      transaction.rollback();
      next(err);
    }
  }

  async delete(req, res) {

    return res.status(204).json({});
  }

  async update(req, res, next) {
    const transaction = await this.sequelize.transaction();

    try {
      const body = req.body;
      const id = req.params.id;

      await this.itemOrderedService.update(id, body, transaction);

      transaction.commit();

      return res.status(204).json({});
    } catch (err) {
      console.log(err);
      transaction.rollback();
      next(err);
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    await this.itemOrderedService.delete(id);

    return res.status(204).json({});
  }

}

module.exports = ItemOrderedController;
