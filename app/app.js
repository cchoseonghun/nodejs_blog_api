'use strict';

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const user = require('./src/routes/user');
const posts = require('./src/routes/posts');

app.use('/api', [user, posts]);

app.use('/', (req, res) => {
  res.send('Hi, SeongHun');
});
module.exports = app;