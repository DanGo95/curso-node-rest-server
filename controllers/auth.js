const bcryptjs = require("bcryptjs");
const { response } = require("express");

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express/lib/response");

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


const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token);

        // check user
        let user = await User.findOne({ email });

        if (!user) {
            // create user
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true,
                role: 'USER_ROLE'
            };

            user = new User(data);
            await user.save();
        }

        // user has been deleted
        if (!user.status) {
            return res.status(401).json({
                msg: 'The user removed the account'
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
        res.status(400).json({
            ok: false,
            msg: 'Token cannot be verified'
        })
    }


}


module.exports = {
    login,
    googleSignIn
}