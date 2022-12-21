'use strict';

const { Token } = require('../sequelize/models');

class TokenStorage {

  static save(refreshToken, userId) {
    return new Promise((resolve, reject) => {
      Token.create({ refreshToken, userId }).then(() => {
        resolve();
      })
    });
  }
}

module.exports = TokenStorage;