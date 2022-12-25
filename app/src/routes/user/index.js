'use strict';

const express = require('express');
const router = express.Router();

const loginCheckMiddleware = require('../../config/loginCheckMiddleware');
const ctrl = require('./user.ctrl');

router.post('/register', loginCheckMiddleware, ctrl.process.register
//  #swagger.description = '회원가입'
//  #swagger.tags = ['User']
/*  #swagger.parameters[''] = {
            in: 'body',
            schema: {
                nickname: 'Developer',
                password: '1234',
                confirmPassword: '1234',
            }
} */
/*  #swagger.responses[201] = {
            description: '회원가입 성공',
            schema: {
                message: '회원가입에 성공하였습니다.'
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '요청한 데이터 형식이 올바르지 않습니다.'
            }
} */
/*  #swagger.responses[401] = {
            description: '회원가입 입력 값 형식이 올바르지 않은 경우',
            schema: {
                message: '올바르지 않은 형식에 대한 메시지 출력'
            }
} */
);

router.post('/login', loginCheckMiddleware, ctrl.process.login
//  #swagger.description = '로그인'
//  #swagger.tags = ['User']
/*  #swagger.parameters[''] = {
            in: 'body',
            schema: {
                nickname: 'Developer',
                password: '1234',
            }
} */
/*  #swagger.responses[400] = {
            description: '예외 케이스에서 처리하지 못한 에러',
            schema: {
                message: '로그인에 실패하였습니다.'
            }
} */
/*  #swagger.responses[401] = {
            description: '해당하는 유저가 존재하지 않는 경우',
            schema: {
                message: '닉네임 또는 패스워드를 확인해주세요.'
            }
} */
);

router.get('/logout', ctrl.process.logout
//  #swagger.description = '로그아웃'
//  #swagger.tags = ['User']
/*  #swagger.responses[200] = {
            description: '로그아웃 성공',
            schema: {
                message: '로그아웃 되었습니다.'
            }
} */
);

module.exports = router;
