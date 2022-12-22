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
const comments = require('./src/routes/comments');
const likes = require('./src/routes/likes');

app.use('/api', [user, posts, comments, likes]);

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./src/config/swagger/swagger-output.json");

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));
module.exports = app;