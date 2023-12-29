const express = require('express');
const roomsRouter = express.Router();
const rooms = require('../controllers/roomController');

//rutas para /rooms
roomsRouter.post('/create', rooms.create);
roomsRouter.get('/', rooms.getAll);
roomsRouter.get('/:name', rooms.getMessagesByRoomName);

module.exports = roomsRouter;