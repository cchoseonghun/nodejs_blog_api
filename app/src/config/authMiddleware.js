'use strict';

const TokenStorage = require('../models/TokenStorage');
const TokenManager = require('../config/TokenManager');

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!refreshToken || !accessToken) {
    return res.status(401).json({ "message": "로그인이 필요한 기능입니다." });
  }

  const isAccessTokenValidate = TokenManager.validateAccessToken(accessToken);
  const isRefreshTokenValidate = TokenManager.validateRefreshToken(refreshToken);

  if (!isRefreshTokenValidate) {
    return res.status(401).json({ "message": "Refresh Token이 만료되었습니다." });
  }

  let userId = -1;
  if (!isAccessTokenValidate) {
    const tokenInfo = await TokenStorage.getTokenInfo(refreshToken);

    if (!tokenInfo) {
      return res.status(404).json({ "message": "Refresh Token의 정보가 서버에 존재하지 않습니다." });
    }

    const newAccessToken = await TokenManager.createAccessToken(tokenInfo.userId);
    res.cookie('accessToken', newAccessToken);

    userId = TokenManager.getAccessTokenPayload(newAccessToken).userId;
  } else {
    userId = TokenManager.getAccessTokenPayload(accessToken).userId;
  }

  res.locals.userId = userId;
  next();
};