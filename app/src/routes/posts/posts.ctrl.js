'use strict';

const Post = require('../../models/Post');

const process = {
  
  write: async (req, res) => {
    const post = new Post(req.body);
    const response = await post.write();

    return res.status(response.code).json({ message: response.message });
  }, 

}

module.exports = {
  process, 
}