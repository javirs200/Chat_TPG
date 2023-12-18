const usersModels = require('../models/users');
const { createToken, decodeToken } = require('../config/jsonWebToken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await usersModels.signup(name, email, password)
        
        const token = createToken({ name, email });

        res.status(201)
            .cookie('access_token', token)
            .json({ msg: "Signed Up" });
    } catch (error) {
        if(error.code === 11000)
        res.status(400).json({ msg: 'duplicated user' });
        else
        res.status(400).json({ msg: error.message });
    }
};

const login = async (req, res) => {
    try {
     
        // leemos datos
        const { email, password } = req.body;
        
        //comprobamos existencia en DB conicidente con email y pasword
        const logedUser = await usersModels.login(email, password)

       if(logedUser.length > 0){
         //recuperamos  nombre de usuario
         const name = logedUser[0].name
        
         // generamos en tokken jwt
         const token = createToken({ name, email });
 
         // enviamos token en cookie y ok login exitoso
         res.status(200)
             .cookie('access_token', token)
             .json({ msg: "logged in" });
       }else{
        res.status(404)
        .json({ msg: "wrong credentials" });
       }

    } catch (error) {

        console.log('login error ->',error);

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