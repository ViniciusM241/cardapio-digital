class ExtraService {
  constructor({
    extraRepository,

    Error,
  }) {
    this.extraRepository = extraRepository;

    this.Error = Error;
  }

  async getExtras() {
    const extras = await this.extraRepository.findAll();

    return extras;
  }

  async getExtraById(id) {
    const extra = await this.extraRepository.findById(id);

    if (!extra) throw new this.Error('extra not found', 404);

    return extra;
  }

  async createExtra(data) {
    if (!data || !data.name || !data.value) throw new this.Error('body missing information', 400);

    const extra = await this.extraRepository.create({
      name: data.name,
      value: data.value.replace(',', '.'),
    });

    return extra;
  }

  async deleteById(id) {
    const extra = await this.extraRepository.findById(id);

    if (!extra) throw new this.Error('extra not found', 404);

    await this.extraRepository.delete(id);

    return true;
  }

  async updateExtra(id, data) {
    if (!data || !data.name || !data.value) throw new this.Error('body missing information', 400);

    const extra = await this.extraRepository.findById(id);

    if (!extra) throw new this.Error('extra not found', 404);

    await this.extraRepository.update(id, {
      name: data.name,
      value: data.value.replace(',', '.'),
    });

    return true;
  }

}

module.exports = ExtraService;
