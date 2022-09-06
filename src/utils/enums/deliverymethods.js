module.exports = {
  'DELIVERY': {
    value: 'DELIVERY',
    label: 'Entrega',
  },
  'TAKEOUT': {
    value: 'TAKEOUT',
    label: 'Retirada',
  },
  get keys() {
    return Object.keys(this).filter(x => x !== 'keys');
  }
};
