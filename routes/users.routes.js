const express = require('express');
const usersRouter = express.Router();
const users = require('../controllers/usersController');

//rutas para /users , peticiones de login
usersRouter.post('/signup', users.signup);
usersRouter.post('/login', users.login);
usersRouter.get('/logout', users.logOut);

module.exports = usersRouter;