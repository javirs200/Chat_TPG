const Message = require('./messageSchema');
const User = require('./usersSchema');

//create
const send = async (userEmail,text) => {

    try {

        const user = await User.find({email:userEmail});

        console.log('objeto user ->',user, 'id user ->',user._id);

        // const newMessage = await Message.create({ userEmail,text });
        return newMessage;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

//read
const getAll = async () => {
    try {
        const allMessages = await Message.find({});
        return allMessages;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

//update -not needed now

//delete -not needed now

const messageModels = {
    send,
    getAll
};

module.exports = messageModels;