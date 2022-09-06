class UserController {
  constructor({
    authService,
  }) {
    this.authService = authService;
  }

  async login(req, res) {
    const body = req.body;
    const response = await this.authService.login(body);

    return res.status(200).json(response);
  }

}

module.exports = UserController;
