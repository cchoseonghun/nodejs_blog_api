'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../config/authMiddleware');
const ctrl = require('./comments.ctrl');

router.post('/posts/:postId/comments', authMiddleware, ctrl.process.write
//  #swagger.description = '댓글 작성'
//  #swagger.tags = ['Comments']
/*  #swagger.parameters[''] = {
            in: 'body',
            schema: {
                comment: '안녕하세요 댓글 입니다.',
            }
} */
/*  #swagger.responses[201] = {
            description: '댓글 작성 성공',
            schema: {
                message: '댓글을 작성하였습니다.'
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '댓글 작성에 실패하였습니다.'
            }
} */
/*  #swagger.responses[404] = {
            description: '해당하는 게시글이 존재하지 않는 경우',
            schema: {
                message: '게시글이 존재하지 않습니다.'
            }
} */
);

router.get('/posts/:postId/comments', ctrl.process.list
//  #swagger.description = '댓글 목록 조회'
//  #swagger.tags = ['Comments']
/*  #swagger.responses[200] = {
            description: '댓글 목록 조회 성공',
            schema: {
                data: [
                  {
                    commentId: '2', 
                    userId: '1', 
                    nickname: 'Developer', 
                    comment: '안녕하세요 2번째 댓글입니다.', 
                    createdAt: '2022-12-14T03:39:20.389Z', 
                    updatedAt: '2022-12-14T03:39:20.389Z', 
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
/*  #swagger.responses[404] = {
            description: '해당하는 게시글이 존재하지 않는 경우',
            schema: {
                message: '게시글이 존재하지 않습니다.'
            }
} */
);

router.put('/posts/:postId/comments/:commentId', authMiddleware, ctrl.process.update
//  #swagger.description = '댓글 수정'
//  #swagger.tags = ['Comments']
/*  #swagger.parameters[''] = {
            in: 'body',
            schema: {
                comment: '수정된 댓글입니다.', 
            }
} */
/*  #swagger.responses[200] = {
            description: '댓글 수정 성공',
            schema: {
                message: '댓글을 수정하였습니다.'
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '댓글 수정에 실패하였습니다.'
            }
} */
/*  #swagger.responses[404] = {
            description: '해당하는 게시글이 존재하지 않는 경우 or 해당하는 댓글이 존재하지 않는 경우',
            schema: {
                message: '게시글이 존재하지 않습니다. or 댓글이 존재하지 않습니다.'
            }
} */
/*  #swagger.responses[500] = {
            description: '댓글 수정이 실패한 경우',
            schema: {
                message: '댓글 수정이 정상적으로 처리되지 않았습니다.'
            }
} */
);

router.delete('/posts/:postId/comments/:commentId', authMiddleware, ctrl.process.delete
//  #swagger.description = '댓글 삭제'
//  #swagger.tags = ['Comments']
/*  #swagger.responses[200] = {
            description: '댓글 삭제 성공',
            schema: {
                message: '댓글을 삭제하였습니다.'
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '댓글 삭제에 실패하였습니다.'
            }
} */
/*  #swagger.responses[404] = {
            description: '해당하는 게시글이 존재하지 않는 경우 or 해당하는 댓글이 존재하지 않는 경우',
            schema: {
                message: '게시글이 존재하지 않습니다. or 댓글이 존재하지 않습니다.'
            }
} */
/*  #swagger.responses[500] = {
            description: '댓글 삭제가 실패한 경우',
            schema: {
                message: '댓글 삭제가 정상적으로 처리되지 않았습니다.'
            }
} */
);

module.exports = router;
