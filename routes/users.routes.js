const express = require('express');
const usersRouter = express.Router();
const users = require('../controllers/usersController');

usersRouter.post('/signup', users.signup);

module.exports = usersRouter;