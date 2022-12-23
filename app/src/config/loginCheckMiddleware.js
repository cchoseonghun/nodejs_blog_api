'use strict';

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  // accessToken 또는 refreshToken이 있을 경우 검증 여부 상관없이 리턴
  if (accessToken || refreshToken) {
    return res.status(401).json({ "message": "이미 로그인이 되어있습니다." });
  }
  next();
};