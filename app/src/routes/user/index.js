'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./user.ctrl');

router.post('/register', ctrl.process.register);
router.post('/login', ctrl.process.login);

module.exports = router;
