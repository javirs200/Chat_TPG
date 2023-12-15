const express = require('express');
const messagesRouter = express.Router();
const messages = require('../controllers/messagesController');

messagesRouter.post('/send', messages.send);


module.exports = messagesRouter;