class WaClientController {
  constructor({
    waClientService,
  }) {
    this.waClientService = waClientService;
  }

  showStatus(req, res) {
    const qr = this.waClientService.getQR();
    const status = this.waClientService.getStatus();

    return res.status(200).json({ qr, status });
  }

  disconnect(req, res) {
    this.waClientService.disconnect();

    const qr = this.waClientService.getQR();
    const status = this.waClientService.getStatus();

    return res.status(200).json({ qr, status });
  }

}

module.exports = WaClientController;
