const usersModels = require('../models/users');
const { createToken,decodeToken } = require('../config/jsonWebToken');

const signup = async (req, res) => {
    try {
        const { name,email, password } = req.body;
        
        const newUser = await usersModels.signup(name,email,password)
        
        console.log('usuario creado');

        const token = createToken({name,email});

        console.log('token creado');

        res.status(201)
        .cookie('access_token', token)
        .json({ msg: "Signed Up" });

        console.log('token enviado');


    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const login = async (req, res) => {
    try {
        console.log("peticion de login ");
        const { email, password } = req.body;
        // console.log(email,password);

        const logedUser = await usersModels.login(email,password)
        
        const name = logedUser[0].name
        console.log("logedUser name ",name)

        const token = createToken({name,email});
    
        //console.log('decoded token',decodeToken(token));
        console.log('envio token en cookie');
        res.status(200)
        .cookie('access_token', token)
        .json({ msg: "logged in" });
        
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const logOut = async (req, res) => {

    try {
        res.status(200)
            .cookie('access_token', "")
            .send();
    } catch (error) {
        res.status(400).json({ msg: error.message });

    }

}


const users = {
    signup,
    login,
    logOut
};

module.exports = users;