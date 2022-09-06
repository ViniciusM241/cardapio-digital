class CartService {
  constructor({
    itemModel,
    itemOrderedService,

    Error,
  }) {
    this.itemModel = itemModel.sequelize();

    this.itemOrderedService = itemOrderedService;

    this.Error = Error;
  }

  async findByCustomerId(customerId) {
    const itemsOrdered = await this.itemOrderedService.findByCustomerId(customerId);

    const total = itemsOrdered.reduce((acc, cur) => acc + parseFloat(cur.total), 0)?.toFixed(2);

    return {
      total,
      itemsOrdered,
    };
  }

  async cleanCart(customerId, transaction) {
    const itemsOrdered = await this.itemOrderedService.findByCustomerId(customerId);

    if (!itemsOrdered.length) throw new this.Error('cart not found', 400);

    await Promise.all(
      itemsOrdered.map(async itemOrdered => {
        await this.itemOrderedService.delete(itemOrdered.id, transaction);
      })
    );

    return true;
  }

  async changeItemOrderedQuantity(customerId, itemOrderedId, data) {
    if (!data || !data.quantity) throw new this.Error('body missing information', 400);

    const itemsOrdered = await this.itemOrderedService.findByCustomerId(customerId);

    if (!itemsOrdered.length) throw new this.Error('cart not found', 400);

    const itemToUpdate = itemsOrdered.find(x => x.id === parseInt(itemOrderedId));

    if (!itemToUpdate) throw new this.Error('itemOrdered not found', 400);

    await this.itemOrderedService.update(itemOrderedId, {
      notes: itemToUpdate.notes,
      quantity: data.quantity || 1,
      itemId: itemToUpdate.itemId,
      customerId: itemToUpdate.customerId,
      extras: itemToUpdate.extras.map((extra) => {
        return {
          id: extra.id,
          quantity: extra.extraItemsOrdered.quantity,
        };
      }),
    });

    return true;
  }

  async delete(customerId, itemOrderedId) {
    const itemsOrdered = await this.itemOrderedService.findByCustomerId(customerId);

    if (!itemsOrdered.length) throw new this.Error('cart not found', 400);

    await this.itemOrderedService.delete(itemOrderedId);

    return true;
  }

}

module.exports = CartService;
