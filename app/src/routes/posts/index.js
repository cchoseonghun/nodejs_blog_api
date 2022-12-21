'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../config/authMiddleware');
const ctrl = require('./posts.ctrl');

router.post('/posts', authMiddleware, ctrl.process.write);
// router.post('/login', ctrl.process.login);

module.exports = router;
