'use strict';

// const User = require('../../models/User');

const process = {
  
  write: async (req, res) => {
    // const user = new User(req.body);
    // const response = await user.register();

    // return res.status(response.code).json({ message: response.message });
    return res.status(200).json({ message: 'hi' });
  }, 

}

module.exports = {
  process, 
}