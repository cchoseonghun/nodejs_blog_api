'use strict';

const { Like, Post, User } = require('../sequelize/models');
const { QueryTypes } = require("sequelize"); 
const { sequelize } = require("../sequelize/models/index"); 

class LikeStorage {

  static findOne(likeInfo) {
    const postId = likeInfo.postId;
    const userId = likeInfo.userId;

    return new Promise((resolve, reject) => {
      Like.findOne({ 
        where: { postId, userId }, 
      })
      .then((like) => {
        resolve(like);
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  static save(likeInfo) {
    const postId = likeInfo.postId;
    const userId = likeInfo.userId;
    
    return new Promise((resolve, reject) => {
      Like.create({ postId, userId })
      .then(() => {
        resolve({ code: 201, message: '게시글의 좋아요를 등록하였습니다.' });
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  static delete(likeInfo) {
    const postId = likeInfo.postId;
    const userId = likeInfo.userId;

    return new Promise((resolve, reject) => {
      Like.destroy({ 
        where: { postId, userId }
      })
      .then((result) => {
        if (result > 0) {  
          resolve({ code: 200, message: '게시글의 좋아요를 취소하였습니다.' });
        } else {
          resolve({ code: 400, message: '게시글 좋아요 취소가 정상적으로 처리되지 않았습니다.' });
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  };
  
  static findAll(userId) {
    return new Promise(async (resolve, reject) => {
      const query 
      = `SELECT 
          p.postId, p.userId, p.title, p.content, p.createdAt, p.updatedAt
          , (SELECT count(userId) FROM Likes AS l WHERE postId = p.postId GROUP BY l.postId) AS likes
        FROM Likes AS l 
        LEFT JOIN Posts AS p 
          ON l.postId = p.postId
        WHERE l.userId = ?
        ORDER BY likes DESC;`; 

      await sequelize.query(query, { 
        type: QueryTypes.SELECT,
        replacements: [userId], 
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  };
}

module.exports = LikeStorage;