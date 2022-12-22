'use strict';

const { Comment } = require('../sequelize/models');

class CommentStorage {

  static save(commentInfo) {
    const postId = commentInfo.postId;
    const userId = commentInfo.userId;
    const content = commentInfo.content;
    
    return new Promise((resolve, reject) => {
      Comment.create({ postId, userId, content })
      .then(() => {
        resolve({ code: 201, message: '댓글을 작성하였습니다.' });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = CommentStorage;