class ExtraItemOrderedService {
  constructor({
    extraItemOrderedRepository,
    extraRepository,

    Error,
  }) {
    this.extraItemOrderedRepository = extraItemOrderedRepository;
    this.extraRepository = extraRepository;

    this.Error = Error;
  }

  async setExtras (itemOrderedId, extras, transaction) {
    if (!Array.isArray(extras)) throw new this.Error('`extra` attribute is invalid', 400);

    await this.extraItemOrderedRepository.delete({
      where: { itemOrderedId },
      transaction,
    });

    await Promise.all(
      extras.map(async extra => {
        const extraEntity = await this.extraRepository.findById(extra.id);

        if (!extraEntity) return;

        await this.extraItemOrderedRepository.create({
          itemOrderedId,
          quantity: isNaN(extra.quantity) ? 1 : extra.quantity,
          extraId: extraEntity.id,
        }, transaction);
      })
    );

    return true;
  }

}

module.exports = ExtraItemOrderedService;
