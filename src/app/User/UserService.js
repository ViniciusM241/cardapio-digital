const { hash } = require("bcryptjs");

class UserService {
  constructor({
    userRepository,

    Error,
  }) {
    this.userRepository = userRepository;

    this.Error = Error;
  }

  async getUsers() {
    const users = await this.userRepository.findAll();

    return users;
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new this.Error('user not found', 404);

    return user;
  }

  async createUser(data) {
    if (!data ||
        !data.name ||
        !data.token ||
        !data.email
      )
        throw new this.Error('body missing information', 400);

    const token = await hash(data.token, 8);

    const userAlreadyExists = await this.userRepository.findOne({
      where: { email: data.email }
    });

    if (userAlreadyExists) throw new this.Error('user already exists', 400);

    const user = await this.userRepository.create({
      token,
      name: data.name,
      email: data.email,
    });

    return user;
  }

  async updateUser(data, id) {
    if (!data.email ||
      !data.password ||
      !data.name
      )
      throw new this.Error('body missing information', 400);

    const token = await hash(data.password, 8);

    await this.userRepository.update(id, {
      email: data.email,
      name: data.name,
      token,
    });
  }

}

module.exports = UserService;
