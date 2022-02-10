const { response } = require("express")


const isAdminRole = (req, res = response, next) => {

    // check if jwt has been verified 
    if (!req.user) {
        return res.status(500).json({
            msg: 'You want to verify role without checking the token first'
        })
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an admin`
        })
    }

    next();
}

const hasRole = (...roles) => {

    return (req, res, next) => {

        // check if jwt has been verified 
        if (!req.user) {
            return res.status(500).json({
                msg: 'You want to verify role without checking the token first'
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service require at least one of this roles ${roles}`
            })
        }

        next();
    }
}


module.exports = {
    isAdminRole,
    hasRole
}