class MenuService {
  constructor({
    itemModel,

    categoryRepository,

    Error,
  }) {
    this.itemModel = itemModel.sequelize();

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

    return menu;
  }

}

module.exports = MenuService;
