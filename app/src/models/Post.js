'use strict';

require('dotenv').config();

class Post {
  constructor(body) {
    this.body = body;
  };

  async write() {


    return { code: 400, message: '요청한 데이터 형식이 올바르지 않습니다.' };
  }
}

module.exports = Post;