const orderStatusEnum = require('./enums/orderStatus');

module.exports = {
  [orderStatusEnum.PENDING.value]: () => {
    return ``;
  },
  [orderStatusEnum.CONFIRMED.value]: (params) => {
    return `✅ Atualização de Pedido:\n\nHola, *${params.customer.name}*, su pedido foi confirmado pelo PERRÓN TEX MEX e já está sendo preparado.${ params.order.timeToDeliver ? ` Estimativa de ${params.order.timeToDeliver}` : ''}`;
  },
  [orderStatusEnum.DELIVERING.value]: (params) => {
    return `✅ Atualização de Pedido:\n\nHOLA, *${params.customer.name}*, su pedido está a caminho.`;
  },
  [orderStatusEnum.WAITINGTAKEOUT.value]: (params) => {
    return `✅ Atualização de Pedido:\n\nHola, *${params.customer.name}*, seu pedido está pronto para ser retirado.`;
  },
  [orderStatusEnum.FINISHED.value]: (params) => {
    return `✅ Atualização de Pedido:\n\n*${params.customer.name}*, Su pedido foi finalizado. MUCHAS GRACIAS POR SU COMPRA !!`;
  }
};
