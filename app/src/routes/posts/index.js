'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../config/authMiddleware');
const ctrl = require('./posts.ctrl');

router.post('/posts', authMiddleware, ctrl.process.write
//  #swagger.description = '게시글 작성'
//  #swagger.tags = ['Posts']
/*  #swagger.parameters[''] = {
            in: 'body',
            schema: {
                title: '안녕하세요 게시글 제목입니다.',
                content: '안녕하세요 content 입니다.',
            }
} */
/*  #swagger.responses[201] = {
            description: '게시글 작성 성공',
            schema: {
                message: '게시글 작성에 성공하였습니다.'
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '게시글 작성에 실패하였습니다.'
            }
} */
);

router.get('/posts', ctrl.process.list
//  #swagger.description = '게시글 조회'
//  #swagger.tags = ['Posts']
/*  #swagger.responses[200] = {
            description: '게시글 조회 성공',
            schema: {
                data: [
                  {
                    postId: '2', 
                    userId: '1', 
                    nickname: 'Developer', 
                    title: '안녕하세요 2번째 게시글 제목입니다.', 
                    createdAt: '2022-12-14T03:39:20.389Z', 
                    updatedAt: '2022-12-14T03:39:20.389Z', 
                    likes: 0
                  }
                ]
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '게시글 조회에 실패하였습니다.'
            }
} */
);

router.get('/posts/:postId', ctrl.process.detail
//  #swagger.description = '게시글 상세 조회'
//  #swagger.tags = ['Posts']
/*  #swagger.responses[200] = {
            description: '게시글 상세 조회 성공',
            schema: {
                data: {
                  postId: '2', 
                  userId: '1', 
                  nickname: 'Developer', 
                  title: '안녕하세요 2번째 게시글 제목입니다.', 
                  content: '안녕하세요 content 입니다.', 
                  createdAt: '2022-12-14T03:39:20.389Z', 
                  updatedAt: '2022-12-14T03:39:20.389Z', 
                  likes: 0
                }
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '게시글 조회에 실패하였습니다.'
            }
} */
);

router.put('/posts/:postId', authMiddleware, ctrl.process.update
//  #swagger.description = '게시글 수정'
//  #swagger.tags = ['Posts']
/*  #swagger.parameters[''] = {
            in: 'body',
            schema: {
                title: '안녕하세요 수정된 게시글 입니다.', 
                content: '안녕하세요 수정된 content 입니다.', 
            }
} */
/*  #swagger.responses[200] = {
            description: '게시글 수정 성공',
            schema: {
                message: '게시글을 수정하였습니다.'
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '게시글 수정에 실패하였습니다.'
            }
} */
/*  #swagger.responses[404] = {
            description: '해당하는 게시글이 존재하지 않는 경우',
            schema: {
                message: '게시글이 존재하지 않습니다.'
            }
} */
/*  #swagger.responses[500] = {
            description: '게시글 수정이 실패한 경우',
            schema: {
                message: '게시글이 정상적으로 수정되지 않았습니다.'
            }
} */
);

router.delete('/posts/:postId', authMiddleware, ctrl.process.delete
//  #swagger.description = '게시글 삭제'
//  #swagger.tags = ['Posts']
/*  #swagger.responses[200] = {
            description: '게시글 삭제 성공',
            schema: {
                message: '게시글을 삭제하였습니다.'
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '게시글 삭제에 실패하였습니다.'
            }
} */
/*  #swagger.responses[404] = {
            description: '해당하는 게시글이 존재하지 않는 경우',
            schema: {
                message: '게시글이 존재하지 않습니다.'
            }
} */
/*  #swagger.responses[500] = {
            description: '게시글 삭제에 실패한 경우',
            schema: {
                message: '게시글이 정상적으로 삭제되지 않았습니다.'
            }
} */
);

module.exports = router;
