class UserController {
  constructor({
    userService,
  }) {
    this.userService = userService;
  }

  async show(req, res) {
    const users = await this.userService.getUsers();

    return res.status(200).json(users);
  }

  async profile(req, res) {
    const id = req.user?.id;
    const user = await this.userService.getUserById(id);

    return res.status(200).json(user);
  }

  async find(req, res) {
    const id = req.params.id;
    const user = await this.userService.getUserById(id);

    return res.status(200).json(user);
  }

  async create(req, res) {
    const body = req.body;
    const user = await this.userService.createUser(body);

    return res.status(201).json(user);
  }

}

module.exports = UserController;
