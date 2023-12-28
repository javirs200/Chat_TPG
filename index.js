const path = require('path');

require('./config/mongoConnection');

const usersRouter = require('./routes/users.routes');
const roomsRouter = require('./routes/room.routes');

const socketController = require('./controllers/socketController')

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas de api
app.use('/users', usersRouter)
app.use('/rooms', roomsRouter)

const server = http.createServer(app);

socketController.init(server)

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
  //*Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}else{

  app.get('/*', (req, res)=>{res.status(404).send('not found')})

}

server.listen(port, () => {
  console.log(`listening on port:${port}`);
});

module.exports = {app,server}