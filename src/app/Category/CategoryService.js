class CategoryService {
  constructor({
    itemModel,

    categoryRepository,

    Error,
  }) {
    this.itemModel = itemModel.sequelize();

    this.categoryRepository = categoryRepository;

    this.Error = Error;
  }

  async getCategories() {
    const categories = await this.categoryRepository.findAll();

    return categories;
  }

  async getCategoryById(id) {
    const category = await this.categoryRepository.findById(id);

    if (!category) throw new this.Error('category not found', 404);

    return category;
  }

  async createCategory(data) {
    if (!data || !data.name) throw new this.Error('body missing information', 400);

    const category = await this.categoryRepository.create({
      name: data.name,
    });

    return category;
  }

  async deleteById(id) {
    const category = await this.categoryRepository.findById(id);

    if (!category) throw new this.Error('category not found', 404);

    await this.categoryRepository.delete(id);

    return true;
  }

  async updateCategory(id, data) {
    if (!data || !data.name) throw new this.Error('body missing information', 400);

    const category = await this.categoryRepository.findById(id);

    if (!category) throw new this.Error('category not found', 404);

    await this.categoryRepository.update(id, {
      name: data.name,
    });

    return true;
  }

}

module.exports = CategoryService;
