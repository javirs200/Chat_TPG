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
        log(newUser)

        responseToken(res,name,email)

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const users = {
    signup
};

module.exports = users;