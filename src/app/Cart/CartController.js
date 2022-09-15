
class CartController {
  constructor({
    cartService,
    Sequelize,
  }) {
    this.cartService = cartService;

    this.sequelize = Sequelize;
  }

  async show(req, res) {
    const customerId = req.params.customerId;
    const cart = await this.cartService.findByCustomerId(customerId);

    return res.status(200).json(cart);
  }

  async clean(req, res, next) {
    const transaction = await this.sequelize.transaction();

    try {

      const customerId = req.params.customerId;

      await this.cartService.cleanCart(customerId, transaction);

      transaction.commit();

      return res.status(204).json({});
    } catch(err) {
      console.log(err);
      transaction.rollback();
      next(err);
    }
  }

  async updateQuantityItemOrdered(req, res) {
    const customerId = req.params.customerId;
    const itemOrderedId = req.params.itemOrderedId;
    const body = req.body;

    const newCart = await this.cartService.changeItemOrderedQuantity(customerId, itemOrderedId, body);

    return res.status(200).json(newCart);
  }

  async deleteItemOrdered(req, res) {
    const customerId = req.params.customerId;
    const itemOrderedId = req.params.itemOrderedId;

    const newCart = await this.cartService.delete(customerId, itemOrderedId);

    return res.status(200).json(newCart);
  }

}

module.exports = CartController;
