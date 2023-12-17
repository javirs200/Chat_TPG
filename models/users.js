const User = require('./usersSchema');

// {
//     "_id" : ObjectId("000000000000000000000000"),
//     "name" : "anonimo",
//     "password" : "0000",
//     "email" : "anonimo@anonimo.com",
//     "createdAt" : ISODate("2023-12-16T22:04:12.646+0000"),
//     "updatedAt" : ISODate("2023-12-16T22:04:12.646+0000"),
//     "__v" : NumberInt(0)
// }


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
        
        return userExists;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

//update -not needed now
const updateUser = async (email,newUser) => {
    try {
        const userExists = await User.replaceOne({ email },newUser);

        return userExists

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

//delete -not needed now
const deleteUser = async (email,password) => {
    try {
        const userExists = await User.deleteOne({ email });
        
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