class ParamService {
  constructor({
    paramRepository,
    Error,
    Sequelize,
  }) {
    this.paramRepository = paramRepository;

    this.sequelize = Sequelize;
    this.Error = Error;
  }

  async show() {
    return await this.paramRepository.findOne();
  }

  async update(data) {
    if (!data.businessNumber)
      throw new this.Error('body missing information', 400);

    const params =  await this.paramRepository.findOne();

    await params.update({
      businessNumber: data.businessNumber,
      deliveryTime: Number(data.deliveryTime) || 0,
      takeoutTime: Number(data.takeoutTime) || 0,
      pix: data.pix,
    });
  }

}

module.exports = ParamService;
