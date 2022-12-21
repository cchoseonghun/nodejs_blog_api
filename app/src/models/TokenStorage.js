'use strict';

const { Token } = require('../sequelize/models');

class TokenStorage {

  static save(refreshToken, userId) {
    return new Promise((resolve, reject) => {
      Token.create({ refreshToken, userId }).then(() => {
        resolve();
      });
    });
  }

  static getTokenInfo(refreshToken) {
    return new Promise((resolve, reject) => {
      Token.findOne({ where: { refreshToken } }).then((token) => {
        resolve(token);
      });
    });
  }
}

module.exports = TokenStorage;