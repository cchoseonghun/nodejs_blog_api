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
  };

  static findAll() {
    return new Promise((resolve, reject) => {
      Post.findAll({ 
        raw: true,
        attributes: ['postId', 'userId', 'User.nickname', 'title', 'createdAt', 'updatedAt'], 
        order: [
          ['postId', 'DESC']
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
  };

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
  };

  static update(postInfo) {
    const postId = postInfo.postId;
    const userId = postInfo.userId;
    const title = postInfo.title;
    const content = postInfo.content;

    return new Promise((resolve, reject) => {
      Post.update({ 
        title, content
      }, {
        where: { postId, userId }
      })
      .then((result) => {
        // accessToken 주인의 작성글이 아닌 경우 등의 이유로 수정된 컬럼이 없을 경우 체크
        if (result[0] > 0) {  
          resolve({ code: 200, message: '게시글을 수정하였습니다.' });
        } else {
          resolve({ code: 401, message: '게시글이 정상적으로 수정되지 않았습니다.' });
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  static delete(postInfo) {
    const postId = postInfo.postId;
    const userId = postInfo.userId;

    return new Promise((resolve, reject) => {
      Post.destroy({
        where: { postId, userId }
      })
      .then((result) => {
        if (result > 0) {  
          resolve({ code: 200, message: '게시글을 삭제하였습니다.' });
        } else {
          resolve({ code: 401, message: '게시글이 정상적으로 삭제되지 않았습니다.' });
        }
      })
      .catch((err) => {
        reject(err);
      });
      // Post.update({ 
      //   deletedAt: Sequelize.literal('NOW()') // 안됨
      // }, {
      //   where: { postId, userId }
      // })
      // .then((result) => {
      //   console.log('result: ', result);
      //   if (result[0] > 0) {  
      //     resolve({ code: 200, message: '게시글을 삭제하였습니다.' });
      //   } else {
      //     resolve({ code: 401, message: '게시글이 정상적으로 삭제되지 않았습니다.' });
      //   }
      // })
      // .catch((err) => {
      //   reject(err);
      // });
    });
  };
}

module.exports = PostStorage;