class CustomerController {
  constructor({
    customerService,
  }) {
    this.customerService = customerService;
  }

  async show(req, res) {
    const customers = await this.customerService.getCustomers();

    return res.status(200).json(customers);
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
