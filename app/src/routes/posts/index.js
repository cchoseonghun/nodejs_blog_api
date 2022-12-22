'use strict';

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../config/authMiddleware');
const ctrl = require('./posts.ctrl');

router.get('/posts', ctrl.process.list);
router.get('/posts/:postId', ctrl.process.detail);

router.post('/posts', authMiddleware, ctrl.process.write);
router.put('/posts/:postId', authMiddleware, ctrl.process.update);
router.delete('/posts/:postId', authMiddleware, ctrl.process.delete);

module.exports = router;
