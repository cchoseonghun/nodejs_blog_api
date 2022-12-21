'use strict';

const Post = require('../../models/Post');

const process = {
  
  write: async (req, res) => {
    req.body.userId = res.locals.userId;
    const post = new Post(req.body);
    const response = await post.write();

    return res.status(response.code).json({ message: response.message });
  }, 

  list: async (req, res) => {
    const post = new Post(req.body);
    const response = await post.list();

    if (response.data) {
      return res.status(response.code).json({ data: response.data });
    } else {
      return res.status(response.code).json({ message: response.message });
    }
  }, 
}

module.exports = {
  process, 
}