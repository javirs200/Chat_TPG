const express = require('express');
const roomsRouter = express.Router();
const rooms = require('../controllers/roomController');
const apiKeyManager = require('../middleware/apiKeyManager')

//rutas para /rooms
roomsRouter.post('/create',apiKeyManager.checkApiKey, rooms.create);
roomsRouter.get('/', rooms.getAll);
roomsRouter.get('/:name', rooms.getMessagesByRoomName);

module.exports = roomsRouter;