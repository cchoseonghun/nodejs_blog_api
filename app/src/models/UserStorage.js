'use strict';

const  {User } = require('../sequelize/models');

class UserStorage {

  static save(userInfo) {
    const nickname = userInfo.nickname;
    const password = userInfo.password;

    return new Promise((resolve, reject) => {
      User.create({ nickname, password });
      resolve({ code: 201, message: '회원가입에 성공하였습니다.' });
    });
  };

  static getUserInfo(userInfo) {
    const nickname = userInfo.nickname;
    
    return new Promise((resolve, reject) => {
      const user = User.findOne({ where: { nickname } });
      resolve(user);
    });
  }
}

module.exports = UserStorage;