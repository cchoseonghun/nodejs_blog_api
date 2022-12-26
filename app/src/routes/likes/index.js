'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../config/authMiddleware');
const ctrl = require('./likes.ctrl');

router.get(
  '/likes/posts',
  authMiddleware,
  ctrl.process.list
  //  #swagger.description = '좋아요 게시글 조회'
  //  #swagger.tags = ['Likes']
  /*  #swagger.responses[200] = {
            description: '게시글 조회 성공',
            schema: {
                data: [
                  {
                    postId: '4', 
                    userId: '1', 
                    nickname: 'Developer', 
                    title: '안녕하세요 4번째 게시글 제목입니다.', 
                    createdAt: '2022-12-14T03:39:20.389Z', 
                    updatedAt: '2022-12-14T03:39:20.389Z', 
                    likes: 1
                  }
                ]
            }
} */
  /*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '좋아요 게시글 조회에 실패하였습니다.'
            }
} */
);

router.put(
  '/posts/:postId/like',
  authMiddleware,
  ctrl.process.like
  //  #swagger.description = '게시글 좋아요'
  //  #swagger.tags = ['Likes']
  /*  #swagger.responses[200] = {
            description: '게시글 좋아요 취소 성공',
            schema: {
                message: '게시글의 좋아요를 취소하였습니다.', 
            }
} */
  /*  #swagger.responses[201] = {
            description: '게시글 좋아요 등록 성공',
            schema: {
                message: '게시글의 좋아요를 등록하였습니다.', 
            }
} */
  /*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '게시글 좋아요에 실패하였습니다.'
            }
} */
  /*  #swagger.responses[404] = {
            description: '해당하는 게시글이 존재하지 않는 경우',
            schema: {
                message: '게시글이 존재하지 않습니다.'
            }
} */
  /*  #swagger.responses[500] = {
            description: '좋아요 취소가 실패한 경우',
            schema: {
                message: '게시글 좋아요 취소가 정상적으로 처리되지 않았습니다.'
            }
} */
);

module.exports = router;
