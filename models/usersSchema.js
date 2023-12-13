const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});



const User = mongoose.model("User", UserSchema);


module.exports = User;