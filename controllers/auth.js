const bcryptjs = require("bcryptjs");
const { response } = require("express");

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // verify if email exist
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Email or password is incorrect'
            })
        }

        // verify if user is active
        if (!user.status) {
            return res.status(400).json({
                msg: 'Email or password is incorrect'
            })
        }

        // verify password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email or password is incorrect'
            })
        }

        // generate jwt
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    }

}

module.exports = {
    login
}