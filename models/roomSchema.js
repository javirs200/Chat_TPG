const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    messajes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, {
    timestamps: true
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;