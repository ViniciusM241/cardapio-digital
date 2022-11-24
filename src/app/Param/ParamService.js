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
    const params = await this.paramRepository.findOne();

    params.deliveryFee = params.deliveryFee === '0.00' ? null : params.deliveryFee;

    return params;
  }

  async update(data) {
    if (!data.businessNumber)
      throw new this.Error('body missing information', 400);

    const params =  await this.paramRepository.findOne();

    await params.update({
      deliveryFee: data.deliveryFee ? data.deliveryFee?.replace(',', '.') : 0,
      businessNumber: data.businessNumber,
      deliveryTime: Number(data.deliveryTime) || 0,
      takeoutTime: Number(data.takeoutTime) || 0,
      pix: data.pix,
    });
  }

}

module.exports = ParamService;
