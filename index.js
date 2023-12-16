require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('./config/mongoConnection');
const cors = require('cors');

const http = require('http');
const server = http.createServer(app);

const SECRET = process.env.MY_TOKEN_SECRET
const { decodeToken } = require('./config/jsonWebToken');

const { Server } = require("socket.io");
const usersRouter = require('./routes/users.routes');
const messagesRouter = require('./routes/messages.routes');

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000" // permito el cliente de develop
  }
});

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter)
app.use('/messages', messagesRouter)

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
  //*Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// io.emit send to all clients , socket.emit send to particular client

io.on('connection', (socket) => {

  const strToken = socket.handshake.headers.cookie
  const acces_tokent = strToken.split('access_token=')[1]
  const decodedToken = decodeToken(acces_tokent)
  const name = decodedToken.name

  socket.emit('setUserNameEvent',name)

  // get user id from db for storage messages

  socket.on('clientMessage', (value) => {

    console.log('echo from server ');

    console.log('client send data: ', value)

    //guardar mensaje en bdd

    let eventObj = { name: '', message: value }

    io.emit('messageEvent', eventObj)
  });

  socket.on('disconnect', () => {
    console.log('disconnect from client');
  });

});

server.listen(port, () => {
  console.log(`listening on port:${port}`);
});