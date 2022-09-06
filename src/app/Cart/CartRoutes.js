module.exports = [
  {
    path: '/carts/:customerId',
    method: 'get',
    action: 'show',
  },
  {
    path: '/carts/:customerId',
    method: 'put',
    action: 'clean',
  },
  {
    path: '/carts/:customerId/items-ordered/:itemOrderedId',
    method: 'patch',
    action: 'updateQuantityItemOrdered',
  },
  {
    path: '/carts/:customerId/items-ordered/:itemOrderedId',
    method: 'delete',
    action: 'deleteItemOrdered',
  },
];
