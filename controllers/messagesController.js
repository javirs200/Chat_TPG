const messageModels = require('../models/messages');

const send = async ()=>{
    try {
        const { email,text } = req.body;
        
        const dbRes = await messageModels.send(email,text)
        console.log(dbRes)

        res.status(201).json({ msg: 'msg stored' });
        

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const messages = {
    send
};

module.exports = messages;