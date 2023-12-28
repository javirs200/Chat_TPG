const express = require('express');
const roomsRouter = express.Router();
const rooms = require('../controllers/roomController');

//rutas para /rooms
roomsRouter.post('/create', rooms.create);

module.exports = roomsRouter;