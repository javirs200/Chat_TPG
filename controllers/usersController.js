const usersModels = require('../models/users');
const { createToken } = require('../config/jsonWebToken');

const responseToken = (res,name,email)=>{
    const token = createToken({name,email});
        res.status(201)
        .cookie('access_token', token)
        .json({ msg: "Signed Up" });
}

const signup = async (req, res) => {
    try {
        const { name,email, password } = req.body;
        console.log(name,email,password);

        const newUser = await usersModels.signup(name,email,password)
        console.log(newUser)

        responseToken(res,name,email)

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const login = async (req, res) => {
    try {

        //TODO
        
        const { name,email, password } = req.body;
        console.log(name,email,password);

        const logedUser = await usersModels.login(email,password)
        console.log(logedUser)

        responseToken(res,name,email)
        

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const users = {
    signup,
    login
};

module.exports = users;