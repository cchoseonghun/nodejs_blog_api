'use strict';

const  {User } = require('../sequelize/models');

class UserStorage {

  static save(nickname, password) {
    return new Promise((resolve, reject) => {
      User.create({ nickname, password });
      resolve({ message: '회원가입에 성공하였습니다.' });
    });
  };


}

module.exports = UserStorage;