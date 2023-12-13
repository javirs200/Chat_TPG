const usersModels = require('../models/users');
const { createToken } = require('../config/jsonWebToken');


const signup = async (req, res) => {
    try {
        const { name,email, password } = req.body;
        console.log(name,email,password);
        const token = createToken({email});
        const newUser = await usersModels.signup(name,email,password)
        res.status(201)
        .set('Authorization', `Bearer ${token}`)
        .cookie('access_token', token)
        .json({ msg: "Signed Up" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const users = {
    signup
};

module.exports = users;