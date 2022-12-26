'use strict';

const LikeStorage = require('./LikeStorage');
const PostStorage = require('./PostStorage');

class Like {
  constructor(body) {
    this.body = body;
  }

  async #checkAlreadyLiked(likeInfo) {
    const like = await LikeStorage.findOne(likeInfo);
    return like;
  }

  async like() {
    let likeInfo = this.body;
    try {
      const post = await PostStorage.findOne(likeInfo.postId);
      if (post) {
        const checkAlreadyLiked = await this.#checkAlreadyLiked(likeInfo);
        if (!checkAlreadyLiked) {
          // 좋아요 등록
          return await LikeStorage.save(likeInfo);
        } else {
          // 좋아요 취소
          return await LikeStorage.delete(likeInfo);
        }
      }
      return { code: 404, message: '게시글이 존재하지 않습니다.' };
    } catch (err) {
      return { code: 400, message: '게시글 좋아요에 실패하였습니다.' };
    }
  }

  async list() {
    const { userId } = this.body;
    try {
      const posts = await LikeStorage.findAll(userId);
      return { code: 200, data: posts };
    } catch (err) {
      console.log(err);
      return { code: 400, message: '좋아요 게시글 조회에 실패하였습니다.' };
    }
  }
}

module.exports = Like;
