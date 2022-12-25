'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');

const UserStorage = require('./UserStorage');
const TokenStorage = require('./TokenStorage');
const TokenManager = require('../config/TokenManager');

class User {
  constructor(body) {
    this.body = body;
  };

  async #encryptPassword(userInfo) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT);

    return new Promise((resolve, reject) => {
      bcrypt.hash(userInfo.password, saltRounds, (err, hash)=>{
        if (err) {
          reject(`${err}`);
        } else {
          userInfo.password = hash;
          resolve(userInfo);
        }
      });
    });
  };

  async #checkPassword(beforePassword, afterPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(beforePassword, afterPassword, (err, result)=>{
        if (err) {
          reject(`${err}`);
        } else {
          resolve(result);
        }
      });
    });
  };

  #checkBodyValue(userInfo) {
    let checkResult = {};
    const nickname = userInfo.nickname;
    const password = userInfo.password;
    const confirmPassword = userInfo.confirmPassword;

    // 비밀번호가 일치하지 않는 경우
    if (password !== confirmPassword) {
      checkResult.code = 401;
      checkResult.message = '패스워드가 일치하지 않습니다.';
    }
    // ID 형식이 비정상적인 경우
    const nicknameRegex = /^[a-zA-Z0-9]{3,}$/g;
    if (!nicknameRegex.test(nickname)) {
      checkResult.code = 401;
      checkResult.message = 'ID의 형식이 일치하지 않습니다.';
    }

    // password 형식이 비정상적인 경우
    const passwordRegex = /^.{4,}$/;
    if (!passwordRegex.test(password)) {
      checkResult.code = 401;
      checkResult.message = '패스워드 형식이 일치하지 않습니다.';
    }

    // password에 닉네임이 포함되어 있는 경우
    if (password.includes(nickname)) {
      checkResult.code = 401;
      checkResult.message = '패스워드에 닉네임이 포함되어 있습니다.';
    }

    return checkResult;
  };

  async register() {
    let userInfo = this.body;
    try {
      // input값에 대해 여러 조건 체크
      const checkResult = this.#checkBodyValue(userInfo);
      if (Object.keys(checkResult).length) {
        return { code: checkResult.code, message: checkResult.message };
      }
      
      // 닉네임 중복 체크
      const user = await UserStorage.getUserInfo(userInfo);
      if (user) {
        return { code: 401, message: '중복된 닉네임입니다.' };
      }

      // 암호화 및 저장
      userInfo = await this.#encryptPassword(userInfo);
      return await UserStorage.save(userInfo);
      
    } catch (err) {
      return { code: 400, message: '요청한 데이터 형식이 올바르지 않습니다.' };
    }
  };

  async login() {
    const userInfo = this.body;
    try {
      const user = await UserStorage.getUserInfo(userInfo);
      if (user) {
        if (await this.#checkPassword(userInfo.password, user.password)) {
          // 로그인 토큰 처리
          const accessToken = await TokenManager.createAccessToken(user.userId);
          const refreshToken = await TokenManager.createRefreshToken();

          // refreshToken 저장
          await TokenStorage.save(refreshToken, user.userId);

          return { code: 200, accessToken, refreshToken };
        }
      }
      return { code: 401, message: '닉네임 또는 패스워드를 확인해주세요.' };

    } catch (err) {
      return { code: 400, message: '로그인에 실패하였습니다.' };
    }
  };
}

module.exports = User;