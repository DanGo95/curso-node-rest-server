const { response, request } = require('express')
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    // check if token exist
    if (!token) {
        return res.status(401).json({
            msg: 'Access denied'
        });
    }

    // validate jwt
    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        const user = await User.findById(uid);

        // validate if user exist
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        // validate if user is active
        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}


module.exports = {
    validateJWT
}