const User = require('./usersSchema');


const signup = async (name,email, password) => {

    try {
        const newUser = await User.create({ name,email,password });
        return newUser;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

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

const userModels = {
    signup,
    login
};


module.exports = userModels;