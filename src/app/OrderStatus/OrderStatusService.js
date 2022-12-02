const ordersStatusEnum = require('../../utils/enums/orderStatus');
const deliveryMethodsEnum = require('../../utils/enums/deliverymethods');
const formatMinutes = require('../../utils/formatMinutes');

class OrderStatusService {
  constructor({
    cartService,
    customerService,
    waClientService,

    orderStatusRepository,
    paramRepository,

    Error,
    Sequelize,
  }) {
    this.cartService = cartService;
    this.customerService = customerService;
    this.waClientService = waClientService;

    this.orderStatusRepository = orderStatusRepository;
    this.paramRepository = paramRepository;

    this.sequelize = Sequelize;
    this.Error = Error;
  }

  async getCurrentStatus(orderId) {
    const status = await this.orderStatusRepository.findOne({
      where: { orderId: orderId },
      order: [[ 'createdAt', 'DESC' ]],
    });

    if (!status || !ordersStatusEnum[status.status]) return ordersStatusEnum.PENDING;

    return ordersStatusEnum[status.status];
  }

  async toNextStatus(order, userId) {
    if (!order.status||
      !order.id ||
      !order.deliveryMethod ||
      !order.customerId
      ) return;

    const nextStatus = this.getNextStatus(order.status.value, order.deliveryMethod);

    await this.orderStatusRepository.create({
      userId,
      orderId: order.id,
      status: nextStatus.value,
    });

    const customer = await this.customerService.getCustomerById(order.customerId);
    const params = await this.paramRepository.findById(1);
    const timeToDeliver = order.deliveryMethod == deliveryMethodsEnum.DELIVERY.value ?
      params.deliveryTime ? formatMinutes(params.deliveryTime) : null :
      params.takeoutTime ? formatMinutes(params.takeoutTime) : null;

    const _order = {
      ...order,
      timeToDeliver,
    };

    return this.waClientService.sendStatusMessage(nextStatus.value, { customer, order: _order });
  }

  getNextStatus(status, deliveryMethod) {
    switch (status) {
      case '': return ordersStatusEnum.PENDING.value;
      case ordersStatusEnum.PENDING.value: return ordersStatusEnum.CONFIRMED;
      case ordersStatusEnum.CONFIRMED.value:
        return deliveryMethod === deliveryMethodsEnum.DELIVERY.value ?
          ordersStatusEnum.DELIVERING :
          ordersStatusEnum.WAITINGTAKEOUT;
      case ordersStatusEnum.DELIVERING.value || ordersStatusEnum.WAITINGTAKEOUT.value:
        return ordersStatusEnum.FINISHED;
      default: return ordersStatusEnum.FINISHED;
    };
  }

}

module.exports = OrderStatusService;
