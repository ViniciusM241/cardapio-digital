class CustomerController {
  constructor({
    customerService,
  }) {
    this.customerService = customerService;
  }

  async show(req, res) {
    const filters = req.query;
    const customers = await this.customerService.getCustomers(filters);

    return res.status(200).json(customers);
  }

  async count(req, res) {
    const count = await this.customerService.getCount();

    return res.status(200).json(count);
  }

  async find(req, res) {
    const id = req.params.id;
    const user = await this.customerService.getCustomerById(id);

    return res.status(200).json(user);
  }

  async create(req, res) {
    const body = req.body;
    const customer = await this.customerService.createCustomer(body);

    return res.status(201).json(customer);
  }

  async delete(req, res) {
    const id = req.params.id;
    await this.customerService.deleteById(id);

    return res.status(204).json();
  }

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;

    await this.customerService.update(id, body);

    return res.status(204).json();
  }

}

module.exports = CustomerController;
