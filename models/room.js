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

// update

// delete

const roomModel = {
    create
};

module.exports = roomModel;