const ordersStatusEnum = require('../../utils/enums/orderStatus');
const deliveryMethodsEnum = require('../../utils/enums/deliverymethods');

class OrderStatusService {
  constructor({
    cartService,
    customerService,

    orderStatusRepository,

    Error,
    Sequelize,
  }) {
    this.cartService = cartService;
    this.customerService = customerService;

    this.orderStatusRepository = orderStatusRepository;

    this.sequelize = Sequelize;
    this.Error = Error;
  }

  async getCurrentStatus(orderId) {
    const status = await this.orderStatusRepository.findOne({
      where: { orderId: orderId },
      orderBy: 'createdAt',
    });

    if (!status || !ordersStatusEnum[status.status]) return ordersStatusEnum.PENDING;

    return ordersStatusEnum[status.status];
  }

  async toNextStatus(order, userId) {
    console.log(order);
    if (!order.status || order.id || order.deliveryMethod) return;

    const nextStatus = this.getNextStatus(order.status.value, order.deliveryMethod);

    console.log(nextStatus);
    await this.orderStatusRepository.create({
      userId,
      orderId: order.id,
      status: nextStatus.value,
    });

    return true;
  }

  getNextStatus(status, deliveryMethod) {
    switch (status) {
      case ordersStatusEnum.PENDING.value: return ordersStatusEnum.CONFIRMED;
      case ordersStatusEnum.CONFIRMED.value: return ordersStatusEnum.PREPARING;
      case ordersStatusEnum.PREPARING.value: return ordersStatusEnum.READY;
      case ordersStatusEnum.READY.value:
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
