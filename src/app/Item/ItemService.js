class ItemService {
  constructor({
    categoryModel,
    extraModel,

    itemRepository,
    categoryRepository,

    extraItemService,

    Error,
  }) {
    this.categoryModel = categoryModel.sequelize();
    this.extraModel = extraModel.sequelize();

    this.itemRepository = itemRepository;
    this.categoryRepository = categoryRepository;

    this.extraItemService = extraItemService;

    this.Error = Error;
  }

  async getItems() {
    const items = await this.itemRepository.findAll({
      include: [
        {
          model: this.categoryModel,
          as: 'category',
        },
      ],
    });

    return items;
  }

  async getItemById(id) {
    const item = await this.itemRepository.findById(id, {
      include: [
        {
          model: this.extraModel,
          as: 'extras',
        },
      ],
    });

    if (!item) throw new this.Error('item not found', 404);

    return item;
  }

  async createItem(data, transaction) {
    if (!data ||
      !data.name ||
      !data.description ||
      !data.value ||
      !data.categoryId ||
      !data.extraItems
    )
      throw new this.Error('body missing information', 400);

    const category = await this.categoryRepository.findById(data.categoryId);

    if (!category) throw new this.Error('category not found', 400);

    const item = await this.itemRepository.create({
      name: data.name,
      description: data.description,
      value: data.value,
      categoryId: data.categoryId,
    }, transaction);

    await this.extraItemService.updateItemsExtras(item.id, data.extraItems, transaction);

    return item;
  }

  async deleteById(id) {
    const item = await this.itemRepository.findById(id);

    if (!item) throw new this.Error('item not found', 404);

    await this.itemRepository.delete(id);

    return true;
  }

  async updateItem(id, data, transaction) {
    if (!data ||
      !data.name ||
      !data.description ||
      !data.value ||
      !data.categoryId ||
      !data.extraItems
    )
      throw new this.Error('body missing information', 400);

    const item = await this.itemRepository.findById(id);

    if (!item) throw new this.Error('item not found', 404);

    const category = await this.categoryRepository.findById(data.categoryId);

    if (!category) throw new this.Error('category not found', 400);

    await this.itemRepository.update(id, {
      name: data.name,
      description: data.description,
      value: data.value,
      categoryId: data.categoryId,
    }, transaction);

    await this.extraItemService.updateItemsExtras(item.id, data.extraItems, transaction);

    return true;
  }

  async getExtras(id) {
    const extras = await this.itemRepository.findOne({
      where: { id },
      include: [
        {
          model: this.extraModel,
          as: 'extras',
        },
      ],
    });

    return extras;
  }

  async setExtras(id, data) {
    if (!data) throw new this.Error('body missing information', 400);

    await this.extraItemService.updateItemsExtras(id, data);

    const extras = await this.itemRepository.findOne({
      where: { id },
      include: [
        {
          model: this.extraModel,
          as: 'extras',
        },
      ],
    });

    return extras;
  }

}

module.exports = ItemService;
