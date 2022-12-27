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
  }

  static findAll(postId, page) {
    const LIMIT = parseInt(process.env.COMMENTS_PAGE_LIMIT);
    return new Promise((resolve, reject) => {
      Comment.findAll({
        where: { postId },
        raw: true,
        attributes: ['commentId', 'userId', 'User.nickname', 'comment', 'createdAt', 'updatedAt'],
        order: [['commentId', 'DESC']],
        include: [
          {
            model: User,
            attributes: [],
          },
        ],
        offset: (page-1)*LIMIT, 
        limit: LIMIT
      })
        .then((comments) => {
          resolve(comments);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static findOne(commentId) {
    return new Promise((resolve, reject) => {
      Comment.findOne({
        where: { commentId },
      })
        .then((comment) => {
          resolve(comment);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static update(commentInfo) {
    const commentId = commentInfo.commentId;
    const postId = commentInfo.postId;
    const userId = commentInfo.userId;
    const comment = commentInfo.comment;

    return new Promise((resolve, reject) => {
      Comment.update(
        {
          comment,
        },
        {
          where: { commentId, postId, userId },
        }
      )
        .then((result) => {
          if (result[0] > 0) {
            resolve({ code: 200, message: '댓글을 수정하였습니다.' });
          } else {
            resolve({ code: 500, message: '댓글 수정이 정상적으로 처리되지 않았습니다.' });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static delete(commentInfo) {
    const commentId = commentInfo.commentId;
    const postId = commentInfo.postId;
    const userId = commentInfo.userId;

    return new Promise((resolve, reject) => {
      Comment.destroy({
        where: { commentId, postId, userId },
      })
        .then((result) => {
          if (result > 0) {
            resolve({ code: 200, message: '댓글을 삭제하였습니다.' });
          } else {
            resolve({ code: 500, message: '댓글 삭제가 정상적으로 처리되지 않았습니다.' });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = CommentStorage;
