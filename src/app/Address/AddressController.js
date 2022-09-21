const axios = require('axios');

class UserController {
  constructor({
  }) {
    this.viacep = 'https://viacep.com.br/ws/';
  }

  async getAddress(req, res) {
    const zipcode = req.params.zipcode;
    const response = await axios.get(`${this.viacep}/${zipcode}/json`);
    const data = response.data;

    const payload = {
      zipcode: data.cep,
      address: data.logradouro,
      district: data.bairro,
    };

    return res.status(200).json(payload);
  }

}

module.exports = UserController;
