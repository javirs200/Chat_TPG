require('dotenv')

const apìkey = process.env.API_KEY

const checkApiKey = (req,res,next)=>{
    console.log('Midddleware called');
    console.log('quest body api key -> ',req.body.apiKey,'| configured api key -> ',apìkey);
    if(req.body.apiKey === apìkey){
        next()
    }else{
        res.status(400).json({msg:'bad api key'})
    }
    
}

const apiKeyManager = {
    checkApiKey
};

module.exports = apiKeyManager;
