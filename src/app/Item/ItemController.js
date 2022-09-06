class ItemController {
  constructor({
    itemService,

    Sequelize,
  }) {
    this.itemService = itemService;
    this.sequelize = Sequelize;
  }

  async show(req, res) {
    const items = await this.itemService.getItems();

    return res.status(200).json(items);
  }

  async find(req, res) {
    const id = req.params.id;
    const item = await this.itemService.getItemById(id);

    return res.status(200).json(item);
  }

  async create(req, res, next) {
    const transaction = await this.sequelize.transaction();

    try {
      const body = req.body;
      const item = await this.itemService.createItem(body, transaction);

      transaction.commit();
      return res.status(201).json(item);
    } catch (err) {
      console.log(err)
      transaction.rollback();
      next(err);
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    await this.itemService.deleteById(id);

    return res.status(204).json();
  }

  async update(req, res, next) {
    const transaction = await this.sequelize.transaction();

    try {
      const id = req.params.id;
      const body = req.body;

      await this.itemService.updateItem(id, body, transaction);

      transaction.commit();
      return res.status(204).json();
    } catch (err) {
      console.log(err);
      transaction.rollback();
      next(err);
    }
  }

  async getExtras(req, res) {
    const id = req.params.id;

    const extras = await this.itemService.getExtras(id);

    return res.status(200).json(extras);
  }

  async setExtras(req, res) {
    const id = req.params.id;
    const body = req.body;

    const extras = await this.itemService.setExtras(id, body);

    return res.status(200).json(extras);
  }

}

module.exports = ItemController;
