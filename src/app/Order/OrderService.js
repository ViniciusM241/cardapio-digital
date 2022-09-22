const orderSchema = require('../../utils/validations/orderSchema');
const paymentMethodsEnum = require('../../utils/enums/paymentMethods');
const deliverymethodsEnum = require('../../utils/enums/deliverymethods');
const orderStatusEnum = require('../../utils/enums/orderStatus');
const { Op } = require('sequelize');

class OrderService {
  constructor({
    orderStatusModel,

    cartService,
    customerService,
    orderStatusService,

    orderRepository,
    paramRepository,

    Error,
  }) {
    this.orderStatusModel = orderStatusModel.sequelize();

    this.cartService = cartService;
    this.customerService = customerService;
    this.orderStatusService = orderStatusService;

    this.orderRepository = orderRepository;
    this.paramRepository = paramRepository;

    this.Error = Error;
  }

  async createItem(data, transaction) {
    const errors = this.validate(data);

    if (Object.keys(errors).length) return { ...data, errors };

    const customer = await this.customerService.getCustomerById(data.customerId);

    await customer.update({
      name: data.fullName,
      phone: data.phone,
    }, { transaction });

    const cart = await this.cartService.findByCustomerId(customer.id);

    if (!cart.itemsOrdered.length) throw new this.Error('cart is empty', 400);

    const params = await this.paramRepository.findById(1);

    const order = await this.orderRepository.create({
      deliveryMethod: data.deliveryMethod,
      address: data.address,
      district: data.district,
      zipcode: data.zipcode,
      number: data.number,
      paymentMethod: data.paymentMethod,
      change: data.paymentMethod === paymentMethodsEnum.CASH.value ? data.change : null,
      total: data.deliveryMethod === deliverymethodsEnum.DELIVERY.value ?
        parseFloat(cart.total) + parseFloat(params.deliveryFee || 5) :
        parseFloat(cart.total),
      customerId: customer.id,
    }, transaction);

    await this.cartService.cleanCart(customer.id, transaction);

    params.paymentMethods = paymentMethodsEnum

    return {
      ...order.dataValues,
      errors,
      params: {
      ...params,
        paymentMethods: paymentMethodsEnum,
      },
    };
  }

  async find(id) {
    const order = await this.orderRepository.findById(id);

    if (!order) throw new this.Error('order not found', 400);

    const status = await this.orderStatusService.getCurrentStatus(order.id);

    return {
      ...order.dataValues,
      status,
    };
  }

  async search({
    status,
    limit,
    offset,
  }) {
    let where = {};
    let include = [];

    if (status === 'OPENED') {
      include.push({
        model: this.orderStatusModel,
        as: 'ordersStatus',
        where: {
          status: { [Op.ne]: orderStatusEnum.FINISHED.value },
        },
      });
    }

    if (status && orderStatusEnum[status]) {
      include.push({
        model: this.orderStatusModel,
        as: 'ordersStatus',
        required: status !== 'PENDING',
        where: {
          status: orderStatusEnum[status].value,
        },
      });
    }

    const orders = await this.orderRepository.findAll({
      include,
      where,
      limit: isNaN(limit) ? null : parseInt(limit),
      offset: isNaN(offset) ? null : parseInt(offset),
    });

    const handledOrders = await Promise.all(
      orders.map(async order => {
        const status = await this.orderStatusService.getCurrentStatus(order.id);

        return {
          ...order.dataValues,
          status,
        };
      })
    );

    return handledOrders;
  }

  async show(id) {
    const order = await this.find(id);

    const cart = await this.cartService.findByCustomerId(order.customerId);

    return {
      ...order,
      cart,
    };
  }

  async updateStatus(id, userId) {
    const order = await this.find(id);

    await this.orderStatusService.toNextStatus(order, userId);
  }

  validate(data) {
    const res = orderSchema.validate(data, { abortEarly: false });

    if (res.error) {
      return res.error.details.reduce((acc, error) => {
        const field = error.context.key;

        return {
            ...acc,
            [field]: error.message,
        };
      }, []);
    }

    return [];
  }

}

module.exports = OrderService;
