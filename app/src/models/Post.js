'use strict';

require('dotenv').config();

const PostStorage = require('./PostStorage');

class Post {
  constructor(body) {
    this.body = body;
  };

  async write() {
    let postInfo = this.body;
    try {
      return await PostStorage.save(postInfo);
    } catch (err) {
      return { code: 400, message: '게시글 작성에 실패하였습니다.' };
    }
  };

  async list() {
    try {
      const posts = await PostStorage.findAll();
      return { code: 200, data: posts };
    } catch (err) {
      return { code: 400, message: '게시글 조회에 실패하였습니다.' };
    }
  };

  async detail() {
    try {
      const { postId } = this.body;
      const post = await PostStorage.findOne(parseInt(postId));
      return { code: 200, data: post };
    } catch (err) {
      return { code: 400, message: '게시글 조회에 실패하였습니다.' };
    }
  };
}

module.exports = Post;