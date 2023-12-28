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

const rooms = {
    create
};

module.exports = rooms;