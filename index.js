require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors')

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server,{
    cors: {
      origin: "http://localhost:3000"
    }
  });

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connection', (socket) => {

    console.log('connected from client',socket.id);
    socket.emit('messageEvent',"hello client ")

    socket.on('clientMessage', (value) => {
      console.log('echo from server ');
      console.log('client send data: ' ,value)
      let msg = "server catched data " + value +""
      socket.emit('messageEvent',msg)
    });

    socket.on('disconnect', () => {
      console.log('disconnect from client');
    });

});

server.listen(port, () => {
    console.log(`listening on port:${port}`);
});