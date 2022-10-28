const messages = require('../../utils/messages');

class WAClientService {
  constructor({
    waClient,
  }) {
    this.waClient = waClient;
  }

  sendMessage(phone, message) {
    const target = this._generateContact(phone);

    this.waClient.sendMessage(target, message);
  }

  getStatus() {
    return this.waClient.status;
  }

  getQR() {
    return this.waClient.qr;
  }

  sendStatusMessage(nextStatus, { customer }) {
    const message = messages[nextStatus]({ customer });

    this.sendMessage(customer.phone, message);
  }

  disconnect() {
    this.waClient.disconnect();
  }

  _generateContact(phone) {
    const endString = '@c.us';

    return `${phone}${endString}`;
  }

}

module.exports = WAClientService;
