class ItemService {
  constructor({
    categoryModel,
    extraModel,

    itemRepository,
    categoryRepository,

    extraItemService,
    specialItemId,

    Error,
  }) {
    this.categoryModel = categoryModel.sequelize();
    this.extraModel = extraModel.sequelize();

    this.itemRepository = itemRepository;
    this.categoryRepository = categoryRepository;

    this.extraItemService = extraItemService;

    this.Error = Error;
    this.specialItemId = specialItemId;
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

    return this.handleSpecialItem(items);
  }

  handleSpecialItem(items) {
    if (this.specialItemId) {
      const found = items.some((item, index) => {
        if(item.id === this.specialItemId) {
          item.dataValues = {
            ...item.dataValues,
            special: true,
          };

          items[index] = item;

          return true;
        }

        return false;
      });

      if (found) {
        const aux = items[0];
        const specialItemIndex = items.findIndex(x => x.dataValues.special);

        items[0] = items[specialItemIndex];
        items[specialItemIndex] = aux;
      }

      return items;
    }

    return items;
  }

  async getItemById(id) {
    const item = await this.itemRepository.findById(id, {
      include: [
        {
          model: this.extraModel,
          as: 'extras',
        },
        {
          model: this.categoryModel,
          as: 'category',
        },
      ],
    });

    if (!item) throw new this.Error('item not found', 404);

    return this.handleSpecialItem([item])[0];
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
      value: data.value.replace(',', '.'),
      categoryId: data.categoryId,
      imageURL: data.imageURL || null,
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
      value: data.value.replace(',', '.'),
      categoryId: data.categoryId,
      imageURL: data.imageURL || null,
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
