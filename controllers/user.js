const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

// retrieve users
const usersGet = async(req = request, res = response) => {

    const { max = 5, init = 0 } = req.query;
    const query = { status: true }

    // execute the promises in the same time
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(init))
        .limit(Number(max))
    ]);

    res.json({
        total,
        users
    })
}

// update user
const userPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...user } = req.body;

    if (password) {
        // hash password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }

    // update user
    const userUpdated = await User.findByIdAndUpdate(id, user);

    res.json({
        msg: 'User updated'
    })
}

// create user
const userPost = async(req, res) => {

    // create new user
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // hash password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // save user
    await user.save();

    res.json({
        user
    })
}

// delete user
const userDelete = async(req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete
}