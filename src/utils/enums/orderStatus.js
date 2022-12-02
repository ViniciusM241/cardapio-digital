module.exports = {
  'PENDING': {
    value: 'PENDING',
    label: 'Pendente',
    color: '#C2272E',
    fontColor: '#FFF',
  },
  'CONFIRMED': {
    value: 'CONFIRMED',
    label: 'Confirmado',
    color: '#F4C302',
  },
  'PREPARING': {
    value: 'PREPARING',
    label: 'Em preparação',
    color: null,
  },
  'READY': {
    value: 'READY',
    label: 'Pronto',
    color: null,
  },
  'DELIVERING': {
    value: 'DELIVERING',
    label: 'Saiu para entrega',
    color: 'rgba(1,146,69,.7)',
  },
  'WAITINGTAKEOUT': {
    value: 'WAITINGTAKEOUT',
    label: 'Aguardando retirada',
    color: 'rgba(1,146,69,.7)',
  },
  'FINISHED': {
    value: 'FINISHED',
    label: 'Finalizado',
    color: null,
  },
  get keys() {
    return Object.keys(this).filter(x => x !== 'keys');
  }
};
