const orderSchema = require('../../utils/validations/orderSchema');
const paymentMethodsEnum = require('../../utils/enums/paymentMethods');
const deliverymethodsEnum = require('../../utils/enums/deliverymethods');
const orderStatusEnum = require('../../utils/enums/orderStatus');
const { Op } = require('sequelize');

class OrderService {
  constructor({
    orderStatusModel,
    customerModel,
    itemOrderedModel,
    itemModel,

    cartService,
    customerService,
    orderStatusService,
    itemOrderedService,

    orderRepository,
    orderStatusRepository,
    paramRepository,

    Error,
    Sequelize,
  }) {
    this.orderStatusModel = orderStatusModel.sequelize();
    this.customerModel = customerModel.sequelize();
    this.itemOrderedModel = itemOrderedModel.sequelize();
    this.itemModel = itemModel.sequelize();

    this.cartService = cartService;
    this.customerService = customerService;
    this.orderStatusService = orderStatusService;
    this.itemOrderedService = itemOrderedService;

    this.orderRepository = orderRepository;
    this.orderStatusRepository = orderStatusRepository;
    this.paramRepository = paramRepository;

    this.Error = Error;
    this.sequelize = Sequelize;
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
      change: data.paymentMethod === paymentMethodsEnum.CASH.value ? data.change?.replace(',', '.') : null,
      total: data.deliveryMethod === deliverymethodsEnum.DELIVERY.value ?
        parseFloat(cart.total) + parseFloat(params.deliveryFee || 5) :
        parseFloat(cart.total),
      customerId: customer.id,
    }, transaction);

    const status = this.orderStatusService.getNextStatus('', data.deliveryMethod);

    await this.orderStatusRepository.create({
      status,
      orderId: order.id,
      userId: null,
    }, transaction);

    await this.cartService.confirmItems(customer.id, order.id, transaction);

    return {
      ...order.dataValues,
      errors,
      params: {
      ...params.dataValues,
        paymentMethods: paymentMethodsEnum,
      },
    };
  }

  async find(id) {
    const order = await this.orderRepository.findById(id, {
      include: [
        {
          model: this.customerModel,
          as: 'customer',
        },
      ],
    });

    if (!order) throw new this.Error('order not found', 400);

    const status = await this.orderStatusService.getCurrentStatus(order.id);
    const itemsOrdered = await this.itemOrderedService.findByOrderId(order.id);

    return {
      ...order.dataValues,
      status,
      itemsOrdered,
    };
  }

  async search({
    status: statusQuery,
    limit,
    offset,
  }) {
    let where = {};
    let include = [];
    const query = {
      limit: isNaN(limit) ? null : parseInt(limit),
      offset: isNaN(offset) ? null : parseInt(offset),
      order: [['createdAt', 'DESC']],
    };

    include.push({
      attributes: ['name'],
      model: this.customerModel,
      as: 'customer',
    });

    const orders = await this.orderRepository.findAll({
      include,
      where,
      ...query,
    });

    const handledOrders = await Promise.all(
      orders.map(async order => {
        const status = await this.orderStatusService.getCurrentStatus(order.id);
        const paymentMethodLabel = paymentMethodsEnum[order.paymentMethod].label;
        const deliveryMethodLabel = deliverymethodsEnum[order.deliveryMethod].label;

        if (statusQuery) {
          if (statusQuery === 'OPENED') {
            if (status.value === orderStatusEnum.FINISHED.value) return null;
          } else {
            if (status.value !== orderStatusEnum[statusQuery]?.value) return null;
          }
        }

        return {
          ...order.dataValues,
          paymentMethodLabel,
          deliveryMethodLabel,
          status,
        };
      })
    );

    return handledOrders.filter(Boolean);
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

    return this.orderStatusService.toNextStatus(order, userId);
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
