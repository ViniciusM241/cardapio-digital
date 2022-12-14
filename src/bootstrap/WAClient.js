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
      this.qr = qr;
    });

    this.client.on('change_state', (state) => {
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

    this.client.on('disconnected', () => {
      this.status = 'OFFLINE';
      this.client.initialize();
      console.log('DISCONNECTED');
    });
  }

  disconnect() {
    this.status = 'OFFLINE';
    this.client.logout();
  }

  sendMessage(target, message) {
    try {
      if (process.env.SEND_WA_MESSAGES === 'true') {
        if (this.status === 'CONNECTED') {
          this.client.sendMessage(target, message);
          return true;
        } else {
          return false;
        }
      }
    } catch(err) {
      console.log(err);

      return false;
    }
  }
}

module.exports = WAClient;
