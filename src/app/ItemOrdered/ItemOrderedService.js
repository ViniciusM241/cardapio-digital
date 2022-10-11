class ItemOrderedService {
  constructor({
    categoryModel,
    extraModel,
    itemModel,
    extraItemOrderedModel,

    itemRepository,
    categoryRepository,
    itemOrderedRepository,

    extraItemService,
    extraItemOrderedService,

    Error,
  }) {
    this.categoryModel = categoryModel.sequelize();
    this.extraModel = extraModel.sequelize();
    this.itemModel = itemModel.sequelize();
    this.extraItemOrderedModel = extraItemOrderedModel.sequelize();

    this.itemRepository = itemRepository;
    this.categoryRepository = categoryRepository;
    this.itemOrderedRepository = itemOrderedRepository;

    this.extraItemService = extraItemService;
    this.extraItemOrderedService = extraItemOrderedService;

    this.Error = Error;
  }

  async create (data, transaction) {
    if (!data ||
      !data.quantity ||
      !data.itemId ||
      !data.extras ||
      !data.customerId
    )
      throw new this.Error('body missing information', 400);

    const item = await this.itemRepository.findById(data.itemId);

    if (!item) throw new this.Error('item not found', 400);

    const itemOrdered = await this.itemOrderedRepository.create({
      quantity: isNaN(data.quantity) ? 1 : data.quantity,
      notes: data.notes || '',
      itemId: item.id,
      customerId: data.customerId,
    }, transaction);

    await this.extraItemOrderedService.setExtras(itemOrdered.id, data.extras, transaction);
  }

  async findById (id) {
    const itemOrdered = await this.itemOrderedRepository.findById(id, {
      include: [
        {
          model: this.extraModel,
          as: 'extras',
        },
        {
          model: this.itemModel,
          as: 'item',
        },
      ],
    });

    if (!itemOrdered) throw new this.Error('itemOrdered not found', 400);

    const total = await this.calculateTotal(itemOrdered.id);

    return {
      ...itemOrdered.dataValues,
      total,
    };
  }

  async findByOrderId(id) {
    const itemsOrdered = await this.itemOrderedRepository.findAll({
      where: { orderId: id },
      include: [
        {
          model: this.extraModel,
          as: 'extras',
        },
        {
          model: this.itemModel,
          as: 'item',
        },
      ],
    });

    if (!itemsOrdered.length) throw new this.Error('Not found', 400);

    const handled = Promise.all(
      itemsOrdered.map(async itemOrdered => {
        const total = await this.calculateTotal(itemOrdered.id);

        return {
          ...itemOrdered.dataValues,
          total,
        };
      })
    );

    return handled;
  }

  async calculateTotal(id) {
    const itemOrdered = await this.itemOrderedRepository.findById(id, {
      include: [
        {
          model: this.extraModel,
          as: 'extras',
        },
        {
          model: this.itemModel,
          as: 'item',
        },
      ],
    });

    if (!itemOrdered) throw new this.Error('itemOrdered not found', 400);

    let subTotal = 0;

    subTotal += parseFloat(itemOrdered.item.value);

    itemOrdered.extras.forEach(extra => {
      const extraTotal = parseFloat(extra.value) * extra.extraItemsOrdered.quantity;
      subTotal += extraTotal;
    });

    const total = (subTotal * itemOrdered.quantity).toFixed(2);

    return total;
  }

  async update (id, data, transaction) {
    if (!data ||
      !data.quantity ||
      !data.itemId ||
      !data.extras
    )
      throw new this.Error('body missing information', 400);

    const itemOrdered = await this.itemOrderedRepository.findById(id);

    if (!itemOrdered) throw new this.Error('itemOrdered not found', 400);

    const item = await this.itemRepository.findById(data.itemId);

    if (!item) throw new this.Error('item not found', 400);

    await this.itemOrderedRepository.update(itemOrdered.id, {
      quantity: isNaN(data.quantity) ? 1 : data.quantity,
      notes: data.notes || '',
      itemId: item.id,
    }, transaction);

    await this.extraItemOrderedService.setExtras(itemOrdered.id, data.extras, transaction);
  }

  async delete(id) {
    const itemOrdered = await this.itemOrderedRepository.findById(id);

    if (!itemOrdered) throw new this.Error('itemOrdered not found', 400);

    await this.itemOrderedRepository.delete(id);
  }

  async findByCustomerId(customerId) {
    const itemsOrdered = await this.itemOrderedRepository.findAll({
      where: { customerId, orderId: null },
      include: [
        {
          model: this.itemModel,
          as: 'item',
        },
        {
          model: this.extraModel,
          as: 'extras',
        },
      ],
    });

    const items = await Promise.all(
      itemsOrdered.map(async (itemOrdered) => {
        const total = await this.calculateTotal(itemOrdered.id);

        return {
          ...itemOrdered.dataValues,
          total,
        };
      })
    );

    return items;
  }

}

module.exports = ItemOrderedService;
