class OrderController {
  constructor({
    orderService,

    Sequelize,
  }) {
    this.orderService = orderService;
    this.sequelize = Sequelize;
  }

  async search(req, res) {
    const query = req.query;

    const orders = await this.orderService.search(query);

    return res.status(200).json(orders);
  }

  async find(req, res) {
    const id = req.params.id;
    const order = await this.orderService.show(id);

    return res.status(200).json(order);
  }

  async create(req, res, next) {
    const transaction = await this.sequelize.transaction();

    try {
      const body = req.body;
      const order = await this.orderService.createItem(body, transaction);

      transaction.commit();
      return res.status(201).json(order);
    } catch (err) {
      console.log(err)
      transaction.rollback();
      next(err);
    }
  }

  async updateStatus(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    await this.orderService.updateStatus(id, userId);

    return res.status(204).json();
  }

}

module.exports = OrderController;
