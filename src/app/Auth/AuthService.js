const { compare } = require("bcryptjs");
const jwt = require('jsonwebtoken');

class UserService {
  constructor({
    userRepository,

    Error,
  }) {
    this.userRepository = userRepository;

    this.Error = Error;
  }

  async login(data) {
    if (!data.email || !data.password) throw new this.Error('invalid body', 400);

    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) throw new this.Error('invalid login', 400);

    const isPasswordCorrect = await compare(data.password, user.token);

    if (!isPasswordCorrect) throw new this.Error('invalid login', 400);

    const response = this.generateToken(user);

    return response;
  }

  generateToken(user) {
    const expiresIn = 2400;

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn,
      },
    );

    return {
      token,
      expiresIn,
    };
  }

}

module.exports = UserService;
