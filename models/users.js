const User = require('./usersSchema');

//create
const signup = async (name,email, password) => {

    try {
        const newUser = await User.create({ name,email,password });
        return newUser;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

//read
const login = async (email,password) => {
    try {
        const userExists = await User.find({ email,password });
        console.log(userExists);
        return userExists;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

//update -not needed now

//delete -not needed now

const userModels = {
    signup,
    login
};


module.exports = userModels;