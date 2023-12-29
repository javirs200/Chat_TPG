const Room = require('./roomSchema');

// create
const create = async (name) => {
    try {
        const newRoom = await Room.create({ name });
        return newRoom;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

// read 
const getAllNames = async () => {
    try {
        const allRooms = await Room.find({}).select('name');
        return allRooms;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

// read 
const getMessagesByRoomName = async (name) => {
    try {
        const matchRoom = await Room.findOne({name:name});
        return matchRoom;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

// update
// add mesages to room by name
const addMessageByRoomName = async (name,messageId) => {
    try {
        const matchRoom = await Room.findOne({name:name});
        matchRoom.messages.push({messageId});
        matchRoom.save();
    } catch (error) {
        console.log(error.message);
        throw error
    };
};


// delete

const roomModel = {
    create,
    getAllNames,
    getMessagesByRoomName,
    addMessageByRoomName
};

module.exports = roomModel;