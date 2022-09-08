const orderStatusEnum = require('./enums/orderStatus');

module.exports = {
  [orderStatusEnum.PENDING.value]: () => {
    return ``;
  },
  [orderStatusEnum.CONFIRMED.value]: (params) => {
    return `✅ Atualização de Pedido:\n\nOlá, *${params.customer.name}*, seu pedido foi confirmado pelo restaurante e já está sendo preparado.`;
  },
  [orderStatusEnum.DELIVERING.value]: (params) => {
    return `✅ Atualização de Pedido:\n\nOlá, *${params.customer.name}*, seu pedido saiu para entrega.`;
  },
  [orderStatusEnum.WAITINGTAKEOUT.value]: (params) => {
    return `✅ Atualização de Pedido:\n\nOlá, *${params.customer.name}*, seu pedido está pronto para ser retirado.`;
  },
  [orderStatusEnum.FINISHED.value]: (params) => {
    return `✅ Atualização de Pedido:\n\nOlá, *${params.customer.name}*, seu pedido foi finalizado. Obrigado pela preferência!!`;
  }
};
