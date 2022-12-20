'use strict';

const UserStorage = require('./UserStorage');

class User {
  constructor(body) {
    this.body = body;
  };

  async register() {
    const { nickname, password, confirmPassword } = this.body;
    return await UserStorage.save(nickname, password);
  }
}

module.exports = User;