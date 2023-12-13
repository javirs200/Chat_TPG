const mongoose = require('mongoose');


const RoomSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    Messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, {
    timestamps: true
});



const Room = mongoose.model("Room", RoomSchema);


module.exports = Room;