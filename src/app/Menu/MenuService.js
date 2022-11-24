class MenuService {
  constructor({
    itemModel,
    itemService,

    categoryRepository,

    Error,
  }) {
    this.itemModel = itemModel.sequelize();
    this.itemService = itemService;

    this.categoryRepository = categoryRepository;

    this.Error = Error;
  }

  async show() {
    const menu = await this.categoryRepository.findAll({
      include: [
        {
          model: this.itemModel,
          as: 'items',
        },
      ],
      order: ['id'],
    });

    menu.forEach((category, index) => {
      menu[index].items = this.itemService.handleSpecialItem(category.items);
    });

    return menu;
  }

}

module.exports = MenuService;
