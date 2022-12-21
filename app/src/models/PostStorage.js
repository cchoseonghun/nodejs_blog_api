'use strict';

const { Post, User } = require('../sequelize/models');

class PostStorage {

  static save(postInfo) {
    const userId = postInfo.userId;
    const title = postInfo.title;
    const content = postInfo.content;

    return new Promise((resolve, reject) => {
      Post.create({ userId, title, content })
      .then(() => {
        resolve({ code: 201, message: '게시글 작성에 성공하였습니다.' });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      Post.findAll({ 
        raw: true,
        attributes: ['postId', 'userId', 'User.nickname', 'title', 'createdAt', 'updatedAt'], 
        order: [
          ['createdAt', 'DESC']
        ], 
        include: [{
          model: User, 
          attributes: [], 
        }], 
      })
      .then((posts) => {
        resolve(posts);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  static findOne(postId) {
    return new Promise((resolve, reject) => {
      Post.findOne({ 
        where: { postId }, 
        raw: true,
        attributes: ['postId', 'userId', 'User.nickname', 'title', 'content', 'createdAt', 'updatedAt'], 
        include: [{
          model: User, 
          attributes: [], 
        }], 
      })
      .then((post) => {
        resolve(post);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

}

module.exports = PostStorage;