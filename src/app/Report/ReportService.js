const { Op } = require("sequelize");
const orderStatusEnum = require('../../utils/enums/orderStatus');
const moment = require('moment');

class StaticService {
  constructor({
    orderRepository,
    orderStatusRepository,

    Sequelize,
    Error,
  }) {
    this.orderRepository = orderRepository;
    this.orderStatusRepository = orderStatusRepository;

    this.sequelize = Sequelize;
    this.Error = Error;
  }

  async getReports({
    initDate=0,
    finDate=new Date()
  }) {
    const _initDate = new Date(initDate);
    const _finDate = new Date(finDate);

    const qtyOrders = await this.orderRepository.count({
      where: {
        createdAt: { [Op.between]: [_initDate, _finDate] },
      }
    });

    const allOrders = await this.orderRepository.findAll({
      attributes: ['id', 'createdAt'],
      where: {
        createdAt: { [Op.between]: [_initDate, _finDate] },
      },
    });

    const diffs = await Promise.all(
      allOrders.map(async order => {
        const orderStatus = await this.orderStatusRepository.findOne({
          attributes: ['id', 'createdAt'],
          where: {
            status: orderStatusEnum.FINISHED.value,
            orderId: order.id
          },
        });

        if (!orderStatus) return 0;

        return moment(orderStatus.createdAt).diff(moment(order.createdAt), 'minutes', true);
      })
    );

    const avgOrderTime = diffs.filter(Boolean).reduce((acc, cur) => acc + cur, 0) / diffs.filter(Boolean).length;

    const totalOrdersADay = await this.orderRepository.count({
      where: {
        createdAt: { [Op.between]: [_initDate, _finDate] },
      },
      group: [this.sequelize.fn('DATE', this.sequelize.col('createdAt'))],
    });

    const orderStatus = await this.orderStatusRepository.count({
      where: {
        createdAt: { [Op.between]: [_initDate, _finDate] },
        status: orderStatusEnum.FINISHED.value,
      },
    });

    return {
      qtyOrders,
      totalOrdersADay,
      paymentsPerOrders: {
        total: allOrders.length - orderStatus,
        payd: orderStatus,
      },
      avgOrderTime: isNaN(avgOrderTime) ? 0 : avgOrderTime.toFixed(0),
    };
  }

}

module.exports = StaticService;
