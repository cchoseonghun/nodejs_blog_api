'use strict';

const  { User } = require('../sequelize/models');

class UserStorage {

  static save(userInfo) {
    const nickname = userInfo.nickname;
    const password = userInfo.password;

    return new Promise((resolve, reject) => {
      User.create({ nickname, password }).then(() => {
        resolve({ code: 201, message: '회원가입에 성공하였습니다.' });
      });
    });
  };

  static getUserInfo(userInfo) {
    const nickname = userInfo.nickname;
    
    return new Promise((resolve, reject) => {
      User.findOne({ where: { nickname } }).then((user) => {
        resolve(user);
      });
    });
  }
}

module.exports = UserStorage;