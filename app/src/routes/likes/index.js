'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../config/authMiddleware');
const ctrl = require('./likes.ctrl');

// router.get('/posts/:postId/comments', ctrl.process.list);

router.put('/posts/:postId/like', authMiddleware, ctrl.process.like);

module.exports = router;
