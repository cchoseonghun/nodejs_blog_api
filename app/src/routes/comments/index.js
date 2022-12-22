'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../config/authMiddleware');
const ctrl = require('./comments.ctrl');

router.get('/posts/:postId/comments', ctrl.process.list);

router.post('/posts/:postId/comments', authMiddleware, ctrl.process.write);
router.put('/posts/:postId/comments/:commentId', authMiddleware, ctrl.process.update);
// router.delete('/posts/:postId', authMiddleware, ctrl.process.delete);

module.exports = router;
