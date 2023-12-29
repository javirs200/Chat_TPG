const messageModel = require('../models/messages');
const roomModel = require('../models/room');

const { Server } = require("socket.io");

const socketConfig = require('../config/socketio')
const { decodeToken } = require('../config/jsonWebToken');

//inicializacion de socket io
const init = (server) => {

    const io = new Server(server, socketConfig);

    const handleConnection = async (socket) => {
        
        let name = 'anonimo'; // nombre generico por defecto  para enviar al fronnt
        let email = undefined; // parametro para el controller si es undefined guarda como usuario generico
        let roomName = 'common'

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

        const handleSetRoomName = (value) => {
            roomName = value.toString()
        }
    
        const handleDisConnection = () => {
            console.log('disconnect from client');
        }
    
        const handleClientMessage =  async (value) => {
            
            try {
                //guardar mensaje en bdd
                let res = await messageModel.save(email, value);
                //crear relacion
                await roomModel.addMessageByRoomName(roomName,res._id);
            
                //construyo objeto para clientes
                let eventObj = { name: name, message: value, timestamp: res.createdAt };
        
                //actualizo el front de todos los clientes
                io.emit('messageEvent', eventObj);
            } catch (error) {
                console.log(error);
            }
        }

        socket.on('setRoomName',handleSetRoomName);

        socket.on('clientMessage',handleClientMessage);

        socket.on('disconnect', handleDisConnection);

    };

    io.on('connection', handleConnection);
}

const socketController = {
    init
}

module.exports = socketController