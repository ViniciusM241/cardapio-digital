module.exports = {
  'PENDING': {
    value: 'PENDING',
    label: 'Pendente',
  },
  'CONFIRMED': {
    value: 'CONFIRMED',
    label: 'Confirmado',
  },
  'PREPARING': {
    value: 'PREPARING',
    label: 'Em preparação',
  },
  'READY': {
    value: 'READY',
    label: 'Pronto',
  },
  'DELIVERING': {
    value: 'DELIVERING',
    label: 'Saiu para entrega',
  },
  'WAITINGTAKEOUT': {
    value: 'WAITINGTAKEOUT',
    label: 'Aguardando retirada',
  },
  'FINISHED': {
    value: 'FINISHED',
    label: 'Finalizado',
  },
  get keys() {
    return Object.keys(this).filter(x => x !== 'keys');
  }
};
