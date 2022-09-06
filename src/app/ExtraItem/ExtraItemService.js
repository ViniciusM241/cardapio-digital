class ExtraService {
  constructor({
    extraItemRepository,
    extraRepository,

    Error,
  }) {
    this.extraItemRepository = extraItemRepository;
    this.extraRepository = extraRepository;

    this.Error = Error;
  }

  async updateItemsExtras(id, extraItems, transaction) {
    if (!Array.isArray(extraItems)) throw new this.Error('invalid body', 400);

    await this.extraItemRepository.delete({
      where: { itemId: id },
      transaction,
    });

    await Promise.all(
      extraItems.map(async item => {
        const extra = await this.extraRepository.findById(item);

        if (!extra) return;

        await this.extraItemRepository.create({
          itemId: id,
          extraId: extra.id,
        }, transaction);
      })
    );

    return true;
  }

}

module.exports = ExtraService;
