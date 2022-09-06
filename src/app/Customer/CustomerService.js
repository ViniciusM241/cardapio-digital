class CustomerService {
  constructor({
    orderModel,
    customerRepository,

    Error,
  }) {
    this.orderModel = orderModel.sequelize();
    this.customerRepository = customerRepository;

    this.Error = Error;
  }

  async getCustomers() {
    const customers = await this.customerRepository.findAll({
      include: [
        {
          model: this.orderModel,
          as: 'orders',
          limit: 1,
          order: [ [ 'createdAt', 'DESC' ]],
        },
      ],
    });

    return customers;
  }

  async getCustomerById(id) {
    const customer = await this.customerRepository.findById(id);

    if (!customer) throw new this.Error('customer not found', 400);

    return customer;
  }

  async createCustomer(data) {
    const customer = await this.customerRepository.create({
      name: data.name || '',
      phone: data.phone || '',
    });

    return customer;
  }

  async deleteById(id) {
    const customer = await this.customerRepository.findById(id);

    if (!customer) throw new this.Error('customer not found', 400);

    await this.customerRepository.delete(id);

    return true;
  }

  async update(id, data) {
    if (!data ||
        !data.name ||
        !data.phone
    )
      throw new this.Error('body missing information', 400);

    const customer = await this.customerRepository.findById(id);

    if (!customer) throw new this.Error('customer not found', 400);

    await this.customerRepository.update(id, {
      name: data.name,
      phone: data.phone,
    });

    return true;
  }

}

module.exports = CustomerService;
