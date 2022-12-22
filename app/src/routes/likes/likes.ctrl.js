'use strict';

const Like = require('../../models/Like');

const process = {
  
  like: async (req, res) => {
    const { postId } = req.params;
    req.body.postId = postId;
    req.body.userId = res.locals.userId;

    const like = new Like(req.body);
    const response = await like.like();

    return res.status(response.code).json({ message: response.message });
  }, 
}

module.exports = {
  process, 
}