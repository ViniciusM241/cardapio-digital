const Joi = require('joi');

const messages = require('./messages');

const schema = Joi.object().keys({
  fullName: Joi.string().required().label('Nome Completo').max(50).min(10).messages(messages),
  phone: Joi.string().required().label('Número WhatsApp').min(12).messages(messages),
  deliveryMethod: Joi.string().required().label('Forma de entrega').valid('DELIVERY', 'TAKEOUT').messages(messages),
  zipcode: Joi.string().required().label('CEP').max(9).messages(messages),
  number: Joi.string().required().label('Número').messages(messages),
  address: Joi.string().required().label('Endereço').messages(messages),
  district: Joi.string().required().label('Bairro').messages(messages),
  paymentMethod: Joi.string().required().label('Forma de pagamento').valid('PIX', 'CASH', 'CREDIT', 'DEBIT').messages(messages),
  change: Joi.number().label('Troco').when(
    'paymentMethod',
    {
      is: 'CASH',
      then: Joi.required(),
      otherwise: Joi.allow(null),
    }
  ).messages(messages),
  customerId: Joi.number().required(),
});

module.exports = schema;
