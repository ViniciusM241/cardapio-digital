module.exports = {
  'PIX': {
    value: 'PIX',
    label: 'PIX',
  },
  'CASH': {
    value: 'CASH',
    label: 'Dinheiro',
  },
  'CREDIT': {
    value: 'CREDIT',
    label: 'Cartão de crédito',
  },
  'DEBIT': {
    value: 'DEBIT',
    label: 'Cartão de débito',
  },
  get keys() {
    return Object.keys(this).filter(x => x !== 'keys');
  }
};
