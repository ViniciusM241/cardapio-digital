class MenuController {
  constructor({
    menuService,
  }) {
    this.menuService = menuService;
  }

  async show(req, res) {
    const menu = await this.menuService.show();

    return res.status(200).json(menu);
  }

}

module.exports = MenuController;
