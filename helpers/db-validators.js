const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const checkRole = await Role.findOne({ role });

    if (!checkRole) {
        throw new Error(`${role} is not a valid role`)
    }

}

// validate if email is unique
const emailExist = async(email = '') => {
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
        throw new Error('This email is already registered');
    }
};

// validate that the id is correct
const userExist = async(id) => {
    const checkId = await User.findById(id);

    if (!checkId) {
        throw new Error('The user does not exist');
    }
};


module.exports = {
    isValidRole,
    emailExist,
    userExist
}