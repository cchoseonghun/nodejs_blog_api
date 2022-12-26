'use strict';

const User = require('../../models/User');

const process = {
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    return res.status(response.code).json({ message: response.message });
  },

  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();

    if (response.code == 200) {
      res.cookie('accessToken', response.accessToken);
      res.cookie('refreshToken', response.refreshToken);
      return res.status(response.code).send();
    }
    return res.status(response.code).json({ message: response.message });
  },

  logout: async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: '로그아웃 되었습니다.' });
  },
};

module.exports = {
  process,
};
