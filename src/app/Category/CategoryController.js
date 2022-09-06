class CategoryController {
  constructor({
    categoryService,
  }) {
    this.categoryService = categoryService;
  }

  async show(req, res) {
    const categories = await this.categoryService.getCategories();

    return res.status(200).json(categories);
  }

  async find(req, res) {
    const id = req.params.id;
    const category = await this.categoryService.getCategoryById(id);

    return res.status(200).json(category);
  }

  async create(req, res) {
    const body = req.body;
    const category = await this.categoryService.createCategory(body);

    return res.status(201).json(category);
  }

  async delete(req, res) {
    const id = req.params.id;
    await this.categoryService.deleteById(id);

    return res.status(204).json();
  }

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;

    await this.categoryService.updateCategory(id, body);

    return res.status(204).json();
  }

}

module.exports = CategoryController;
