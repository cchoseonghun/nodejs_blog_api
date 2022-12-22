'use strict';

const { Comment, User } = require('../sequelize/models');

class CommentStorage {

  static save(commentInfo) {
    const postId = commentInfo.postId;
    const userId = commentInfo.userId;
    const comment = commentInfo.comment;
    
    return new Promise((resolve, reject) => {
      Comment.create({ postId, userId, comment })
      .then(() => {
        resolve({ code: 201, message: '댓글을 작성하였습니다.' });
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  static findAll(postId) {
    return new Promise((resolve, reject) => {
      Comment.findAll({ 
        where: { postId }, 
        raw: true,
        attributes: ['commentId', 'userId', 'User.nickname', 'comment', 'createdAt', 'updatedAt'], 
        order: [
          ['commentId', 'DESC']
        ], 
        include: [{
          model: User, 
          attributes: [], 
        }], 
      })
      .then((comments) => {
        resolve(comments);
      })
      .catch((err) => {
        reject(err);
      });
    });
  };
}

module.exports = CommentStorage;