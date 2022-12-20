'use strict';

const User = require('../../models/User');

const process = {
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    return res.status(200).json(response);
  }, 
  login: async (req, res) => {
    // const user = new User(req.body);
    // const response = await user.login();

    // return res.status(200).json(response);
  }, 
    
}

module.exports = {
  process, 
}