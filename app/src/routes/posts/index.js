'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./posts.ctrl');

router.post('/posts', ctrl.process.write);
// router.post('/login', ctrl.process.login);

module.exports = router;
