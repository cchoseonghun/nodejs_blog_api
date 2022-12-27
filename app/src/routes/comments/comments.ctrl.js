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

  list: async (req, res) => {
    req.body.page = req.query.p || 1;
    const { postId } = req.params;
    req.body.postId = postId;

    const comment = new Comment(req.body);
    const response = await comment.list();

    if (response.data) {
      return res.status(response.code).json({ data: response.data });
    } else {
      return res.status(response.code).json({ message: response.message });
    }
  },

  update: async (req, res) => {
    const { postId, commentId } = req.params;
    req.body.postId = postId;
    req.body.commentId = commentId;
    req.body.userId = res.locals.userId;

    const comment = new Comment(req.body);
    const response = await comment.update();

    return res.status(response.code).json({ message: response.message });
  },

  delete: async (req, res) => {
    const { postId, commentId } = req.params;
    req.body.postId = postId;
    req.body.commentId = commentId;
    req.body.userId = res.locals.userId;

    const comment = new Comment(req.body);
    const response = await comment.delete();

    return res.status(response.code).json({ message: response.message });
  },
};

module.exports = {
  process,
};
