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
    
}

module.exports = {
  process, 
}