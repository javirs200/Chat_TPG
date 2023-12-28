const messageModel = require('../models/messages');

const { Server } = require("socket.io");

const socketConfig = require('../config/socketio')
const { decodeToken } = require('../config/jsonWebToken');

//inicializacion de socket io
const init = (server) => {

    const io = new Server(server, socketConfig);

    const handleConnection = async (socket) => {
        
        let name = 'anonimo'; // nombre generico por defecto  para enviar al fronnt
        let email = undefined; // parametro para el controller si es undefined guarda como usuario generico

        try {
            // comprobacion del token en las cokies para ver si esta logado y servirle el nomre de usuario
            const strToken = socket.handshake.headers.cookie;
            if (strToken) {
                const acces_tokent = strToken.split('access_token=')[1];
                const decodedToken = decodeToken(acces_tokent);
                name = decodedToken.name;
                email = decodedToken.email;
                socket.emit('setUserNameEvent', name);
            }
        } catch (error) {
            console.log(error);
        }

        //recupero los mensajes de la base de datos para servirlos al cliente de nueva conexion
        let allMessages = await messageModel.getAll();

        //evento envio al usuario que se acaba de conectar
        socket.emit('setAllMessagesEvent', allMessages);

        socket.on('clientMessage',handleClientMessage);

        socket.on('disconnect', handleDisConnection);

    };

    const handleDisConnection = () => {
        console.log('disconnect from client');
    }

    const handleClientMessage =  async (value) => {
        
        //guardar mensaje en bdd
        let res = await messageModel.save(email, value);

        //construyo objeto para clientes
        let eventObj = { name: name, message: value, timestamp: res.createdAt };

        //actualizo el front de todos los clientes
        io.emit('messageEvent', eventObj);
    }

    io.on('connection', handleConnection);
}

const socketController = {
    init
}

module.exports = socketController