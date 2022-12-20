'use strict';

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const user = require('./src/routes/user');

app.use('/api', user);

app.use('/', (req, res) => {
  res.send('Hi, SeongHun');
});
module.exports = app;