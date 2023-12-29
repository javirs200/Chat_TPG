const roomModel = require('../models/room');

const create = async (req, res) => {
    try {
        const { name } = req.body;

        await roomModel.create(name);
        
        res.status(201).json({ msg: "room created" });
    } catch (error) {
        if(error.code === 11000)
        res.status(400).json({ msg: 'duplicated' });
        else
        res.status(400).json({ msg: error.message });
    }
};

const getAll = async (req, res)=>{

    try {
        const allRooms = await roomModel.getAllNames();
        
        res.status(200).json({ msg: "current rooms",rooms: allRooms });

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

}

const getMessagesByRoomName = async (req, res) => {
    try {
        const { name } = req.params;

        const roomMessages = await roomModel.getMessagesByRoomName(name);
        
        res.status(200).json({ msg: `room ${name} found` ,messages: roomMessages});
    } catch (error) {
        res.status(404).json({ msg: `room ${name} not found` });
    }
}

const rooms = {
    create,
    getAll,
    getMessagesByRoomName
};

module.exports = rooms;