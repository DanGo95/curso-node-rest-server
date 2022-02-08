const { response, request } = require('express');


const usersGet = (req = request, res = response) => {

    const { page } = req.query;

    res.json({
        msg: 'get API',
        page
    })
}

const userPut = (req, res) => {

    const { id } = req.params;

    res.status(500).json({
        msg: 'put API',
        id
    })
}

const userPost = (req, res) => {

    const { name, age } = req.body;

    res.status(201).json({
        msg: 'post API',
        name,
        age
    })
}

const userDelete = (req, res) => {
    res.json({
        msg: 'delete API'
    })
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete
}