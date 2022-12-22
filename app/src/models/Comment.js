'use strict';

const CommentStorage = require('./CommentStorage');
const PostStorage = require('./PostStorage');

class Comment {
  constructor(body) {
    this.body = body;
  };

  #checkWriteValue(commentInfo) {
    let checkResult = {};

    if (commentInfo.comment.length == 0) {
      checkResult.code = 412;
      checkResult.message = '댓글 내용을 입력해주세요.';
    }
    return checkResult;
  }

  async write() {
    let commentInfo = this.body;
    try {
      const checkResult = this.#checkWriteValue(commentInfo)
      if (Object.keys(checkResult).length) {
        return { code: checkResult.code, message: checkResult.message };
      }

      const post = await PostStorage.findOne(commentInfo.postId);
      if (post) {
        return await CommentStorage.save(commentInfo);
      } 
      return { code: 404, message: '게시글이 존재하지 않습니다.' };
    } catch (err) {
      return { code: 400, message: '댓글 작성에 실패하였습니다.' };
    }
  }

  async list() {
    let commentInfo = this.body;

    try {
      const post = await PostStorage.findOne(commentInfo.postId);
      if (post) {
        const comments = await CommentStorage.findAll(commentInfo.postId);
        return { code: 200, data: comments };
      } 
      return { code: 404, message: '게시글이 존재하지 않습니다.' };
    } catch (err) {
      return { code: 400, message: '댓글 조회에 실패하였습니다.' };
    }
  };
}

module.exports = Comment;