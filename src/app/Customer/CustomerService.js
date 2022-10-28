const { Op } = require("sequelize");

class CustomerService {
  constructor({
    orderModel,
    customerRepository,

    Error,
    Sequelize,
  }) {
    this.orderModel = orderModel.sequelize();
    this.customerRepository = customerRepository;

    this.Error = Error;
    this.sequelize = Sequelize;
  }

  async getCustomers({
    limit=5,
    offset=0,
    order='asc',
    sort='orders',
  }) {
    if (sort === 'orders') {
      sort = 'id';
    }

    const customers = await this.customerRepository.findAll({
      include: [
        {
          model: this.orderModel,
          as: 'orders',
          limit: 1,
          order: [[ 'createdAt', 'DESC' ]],
        },
      ],
      order: [[ sort, order ]],
      where: {
        name: {
          [Op.ne]: ''
        },
        phone: {
          [Op.ne]: ''
        },
      },
      limit: Number(limit),
      offset: Number(offset),
    });

    return customers;
  }

  async getCount() {
    const count = await this.customerRepository.count();

    return count;
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
