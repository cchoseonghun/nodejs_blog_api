'use strict';

const { Token } = require('../sequelize/models');

class TokenStorage {

  static save(refreshToken, userId) {
    return new Promise((resolve, reject) => {
      Token.create({ refreshToken, userId })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  static getTokenInfo(refreshToken) {
    return new Promise((resolve, reject) => {
      Token.findOne({ where: { refreshToken } })
      .then((token) => {
        resolve(token);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = TokenStorage;