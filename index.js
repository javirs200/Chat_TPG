require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
require('./config/mongoConnection');
const cors = require('cors');

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const usersRouter = require('./routes/users');

const io = new Server(server,{
    cors: {
      origin: "http://localhost:3000"
    }
  });

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/users',usersRouter)

//404
app.get("*", (req, res) => { res.sendFile(path.join(__dirname + '/client/build/index.html')) });


// io.emit send to all clients , socket.emit send to particular client

io.on('connection', (socket) => {

    console.log('connected from client',socket.id);
    let msg = "hello client " + socket.id
    io.emit('messageEvent',msg)

    socket.on('clientMessage', (value) => {
      console.log('echo from server ');
      console.log('client send data: ' ,value)
      let msg = "server catched data " + value +""
      io.emit('messageEvent',msg)
    });

    socket.on('disconnect', () => {
      console.log('disconnect from client');
    });

});

server.listen(port, () => {
    console.log(`listening on port:${port}`);
});