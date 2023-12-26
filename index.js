require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('./config/mongoConnection');
const cors = require('cors');

const http = require('http');
const server = http.createServer(app);

const { decodeToken } = require('./config/jsonWebToken');

const { Server } = require("socket.io");
const usersRouter = require('./routes/users.routes');

const messageModel = require('./models/messages');

const socketConfig = require('./config/socketio')

//inicializacion de socket io
const io = new Server(server, socketConfig);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas de api para login
app.use('/users', usersRouter)

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
  //*Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


// io.emit send to all clients , socket.emit send to particular client
io.on('connection', async (socket) => {

  let name = 'anonimo' // nombre generico por defecto  para enviar al fronnt
  let email = undefined // parametro para el controller si es undefined guarda como usuario generico

  try {
    // comprobacion del token en las cokies para ver si esta logado y servirle el nomre de usuario
    const strToken = socket.handshake.headers.cookie
    if (strToken) {
      const acces_tokent = strToken.split('access_token=')[1]
      const decodedToken = decodeToken(acces_tokent)
      name = decodedToken.name
      email = decodedToken.email
      socket.emit('setUserNameEvent', name)
    }
  } catch (error) {
    console.log(error);
  }

  //recupero los mensajes de la base de datos para servirlos al cliente de nueva conexion
  let allMessages = await messageModel.getAll()
  
  //evento envio al usuario que se acaba de conectar
  socket.emit('setAllMessagesEvent', allMessages)

  socket.on('clientMessage', async (value) => {
    //mensaje recibido
    
    //guardar mensaje en bdd
    let res = await messageModel.save(email, value)

    //construyo objeto para clientes
    let eventObj = { name: name, message: value , timestamp: res.createdAt }

    //actualizo el front de todos los clientes
    io.emit('messageEvent', eventObj)
  });

  socket.on('disconnect', () => {
    console.log('disconnect from client');
  });

});

server.listen(port, () => {
  console.log(`listening on port:${port}`);
});

module.exports = {app,server}