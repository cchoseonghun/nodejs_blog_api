'use strict';

const Comment = require('../../models/Comment');

const process = {
  
  write: async (req, res) => {
    const { postId } = req.params;
    req.body.postId = postId;
    req.body.userId = res.locals.userId;
    const comment = new Comment(req.body);
    const response = await comment.write();

    return res.status(response.code).json({ message: response.message });
  }, 
}

module.exports = {
  process, 
}