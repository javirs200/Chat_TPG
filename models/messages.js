const Message = require('./messageSchema');
const User = require('./usersSchema');

//create
const save = async (userEmail,text) => {

    try {

        console.log('email de usuario',userEmail);

        const user = await User.findOne({email:userEmail});

        if(user){
            const newMessage = await Message.create({ content:text,id_user:user.id });
            return newMessage;
        }else{
            const newMessage = await Message.create({ content:text,id_user:'000000000000000000000000'}); //fake user
            return newMessage;
        }

    } catch (error) {
        console.log(error.message);
        
    };
};

//read
const getAll = async () => {
    try {

        const res = await Message.find({});

        let allMessages = []

        for (const m of res) {

            const user =  await User.findOne({_id:m.id_user});
           
            allMessages.push({name:user.name,message:m.content,timestamp:m.createdAt})
        }
    
        return allMessages;

    } catch (error) {
        console.log(error.message);
    };
};

//update -not needed now
const updateMessage = async (userEmail,text,newText) => {
    try {

        const user = await User.findOne({email:userEmail});

        if(user){
            const messageExists = await Message.replaceOne({ content:text,id_user:user.id },{ content:newText,id_user:user.id });
            return messageExists;
        }

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

//delete -not needed now
const deleteMessage = async (userEmail,text) => {
    try {
        const user = await User.findOne({email:userEmail});

        if(user){
            const messageExists = await Message.deleteOne({ content:text,id_user:user.id });
            return messageExists;
        }

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

const messageModels = {
    save,
    getAll
};

module.exports = messageModels;