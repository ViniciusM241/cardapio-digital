const { createContainer, asValue } = require('awilix');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Router = require('./bootstrap/Router');
const bootstrap = require('./bootstrap');
const WAClient = require('./bootstrap/WAClient');

class App {
  constructor() {
    this.app = express();
    this.container = createContainer();

    this.configure();
  }

  init() {
    const port = process.env.PORT || 3000;

    this.app.listen(port, console.log(`Running on port ${port}`));
  }

  configure() {
    this.app.use(helmet());
    this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api/static', express.static(__dirname + '/static'));

    bootstrap(this.container);

    const waClient = new WAClient();
    waClient.init();

    this.container.register({ waClient: asValue(waClient) });

    const router = new Router(this.app, this.container);
    router.registerRoutes();
  }

}

module.exports = new App();
