'use strict';

const PostStorage = require('./PostStorage');

class Post {
  constructor(body) {
    this.body = body;
  }

  async write() {
    const postInfo = this.body;
    try {
      return await PostStorage.save(postInfo);
    } catch (err) {
      return { code: 400, message: '게시글 작성에 실패하였습니다.' };
    }
  }

  async list() {
    const { page } = this.body;
    try {
      const posts = await PostStorage.findAll(page);
      return { code: 200, data: posts };
    } catch (err) {
      return { code: 400, message: '게시글 조회에 실패하였습니다.' };
    }
  }

  async detail() {
    try {
      const { postId } = this.body;
      const post = await PostStorage.findOne(parseInt(postId));
      return { code: 200, data: post };
    } catch (err) {
      return { code: 400, message: '게시글 조회에 실패하였습니다.' };
    }
  }

  async update() {
    const postInfo = this.body;
    try {
      const post = await PostStorage.findOne(postInfo.postId);
      if (post) {
        return await PostStorage.update(postInfo);
      }
      return { code: 404, message: '게시글이 존재하지 않습니다.' };
    } catch (err) {
      return { code: 400, message: '게시글 수정에 실패하였습니다.' };
    }
  }

  async delete() {
    const postInfo = this.body;
    try {
      const post = await PostStorage.findOne(postInfo.postId);
      if (post) {
        return await PostStorage.delete(postInfo);
      }
      return { code: 404, message: '게시글이 존재하지 않습니다.' };
    } catch (err) {
      console.log(err);
      return { code: 400, message: '게시글 삭제에 실패하였습니다.' };
    }
  }
}

module.exports = Post;
