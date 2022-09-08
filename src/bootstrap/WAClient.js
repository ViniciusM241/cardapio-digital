const { Client, LocalAuth } = require('whatsapp-web.js');

class WAClient {
  constructor() {
    this.client;
    this.qr;
    this.status = 'OFFLINE';
  }

  init() {
    this.client = new Client({
      authStrategy: new LocalAuth({ clientId: 'client_one' }),
    });

    this.setUpEvents();

    this.client.initialize();
  }

  setUpEvents() {
    this.client.on('qr', (qr) => {
      console.log(qr);
      this.qr = qr;
    });

    this.client.on('change_state', (state) => {
      console.log(state)
      this.status = state;
    });

    this.client.on('ready', () => {
      this.status = 'CONNECTED';
      console.log('Client is ready!');
    });

    this.client.on('authenticated', () => {
      this.status = 'AUTHENTICATED';
      console.log('AUTHENTICATED');
    });
  }

  sendMessage(target, message) {
    try {
      if (process.env.SEND_WA_MESSAGES === 'true') {
        if (this.status === 'CONNECTED') {
          this.client.sendMessage(target, message);
        }
      }
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = WAClient;
