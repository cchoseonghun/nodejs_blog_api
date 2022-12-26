'use strict';

const { Post } = require('../sequelize/models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../sequelize/models/index');

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
    return new Promise(async (resolve, reject) => {
      const query = `SELECT 
                      p.postId, p.userId, nickname, title, p.createdAt, p.updatedAt
                      ,IFNULL((
                        SELECT count(userId) 
                        FROM Likes AS l 
                        WHERE postId = p.postId 
                        GROUP BY l.postId)
                      , 0) 
                      AS likes
                    FROM Posts AS p
                    LEFT JOIN Users AS u
                    ON p.userId = u.userId
                    ORDER BY postId DESC;`;

      await sequelize
        .query(query, {
          type: QueryTypes.SELECT,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  static findOne(postId) {
    return new Promise(async (resolve, reject) => {
      const query = `SELECT 
                      p.postId, p.userId, nickname, title, content, p.createdAt, p.updatedAt
                      ,IFNULL((
                        SELECT count(userId) 
                        FROM Likes AS l 
                        WHERE postId = p.postId 
                        GROUP BY l.postId)
                      , 0) 
                      AS likes
                    FROM Posts AS p
                    LEFT JOIN Users AS u
                    ON p.userId = u.userId
                    WHERE p.postId = ?;`;

      await sequelize
        .query(query, {
          type: QueryTypes.SELECT,
          replacements: [postId],
        })
        .then(([result]) => {
          // sequelize.query로 받는 형태가 array 타입이라 객제 구조 분해 할당을 통해 받음
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  static update(postInfo) {
    const postId = postInfo.postId;
    const userId = postInfo.userId;
    const title = postInfo.title;
    const content = postInfo.content;

    return new Promise((resolve, reject) => {
      Post.update(
        {
          title,
          content,
        },
        {
          where: { postId, userId },
        }
      )
        .then((result) => {
          // accessToken 주인의 작성글이 아닌 경우 등의 이유로 수정된 컬럼이 없을 경우 체크
          if (result[0] > 0) {
            resolve({ code: 200, message: '게시글을 수정하였습니다.' });
          } else {
            resolve({ code: 500, message: '게시글이 정상적으로 수정되지 않았습니다.' });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static delete(postInfo) {
    const postId = postInfo.postId;
    const userId = postInfo.userId;

    return new Promise((resolve, reject) => {
      Post.destroy({
        where: { postId, userId },
      })
        .then((result) => {
          if (result > 0) {
            resolve({ code: 200, message: '게시글을 삭제하였습니다.' });
          } else {
            resolve({ code: 500, message: '게시글이 정상적으로 삭제되지 않았습니다.' });
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
  }
}

module.exports = PostStorage;
