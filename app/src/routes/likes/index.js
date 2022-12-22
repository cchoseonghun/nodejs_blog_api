'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../config/authMiddleware');
const ctrl = require('./likes.ctrl');

router.get('/likes/posts', authMiddleware, ctrl.process.list);

router.put('/posts/:postId/like', authMiddleware, ctrl.process.like);

module.exports = router;
