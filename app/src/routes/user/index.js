'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./user.ctrl');

router.post('/register', ctrl.process.register
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
            description: '닉네임이 중복된 경우 or 비밀번호가 일치하지 않는 경우',
            schema: {
                message: '중복된 닉네임입니다. or 패스워드가 일치하지 않습니다.'
            }
} */
);

router.post('/login', ctrl.process.login
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

module.exports = router;
