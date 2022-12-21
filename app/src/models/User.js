'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');

const UserStorage = require('./UserStorage');

class User {
  constructor(body) {
    this.body = body;
  };

  async #encryptPsword(userInfo) {
    const saltRounds = parseInt(process.env.SALT);

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

  #checkRegisterValue(userInfo) {
    let checkResult = {};

    // 비밀번호가 일치하지 않는 경우
    if (userInfo.password !== userInfo.confirmPassword) {
      checkResult.code = 412;
      checkResult.message = '패스워드가 일치하지 않습니다.';
    }
    // ID 형식이 비정상적인 경우

    // password 형식이 비정상적인 경우

    // password에 닉네임이 포함되어 있는 경우


    return checkResult;
  }

  async register() {
    let userInfo = this.body;

    try {
      // input값에 대해 여러 조건 체크
      const checkResult = this.#checkRegisterValue(userInfo)
      if (Object.keys(checkResult).length) {
        return { code: checkResult.code, message: checkResult.message };
      }
      
      // 닉네임 중복 체크
      const user = await UserStorage.getUserInfo(userInfo);
      if (user) {
        return { code: 412, message: '중복된 닉네임입니다.' };
      }

      // 암호화 및 저장
      userInfo = await this.#encryptPsword(userInfo);
      return await UserStorage.save(userInfo);
      
    } catch (err) {
      return { code: 400, message: '요청한 데이터 형식이 올바르지 않습니다.' };
    }
  };
}

module.exports = User;