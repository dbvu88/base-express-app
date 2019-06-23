const jwt = require('jsonwebtoken');
// const {
//     secret
// } = require('config.json');


const authorize = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(
        token,
        process.env.SECRET,
        (err, decodedToken) => {
            if (err) {
                res.status(401).json(err)
            } else {
                req.decodedToken = decodedToken
                next()
            }
        }
    )

    // if (roles.length && !roles.includes(req.user.role)) {
    //     // user's role is not authorized
    //     return res.status(401).json({
    //         message: 'Unauthorized'
    //     });
    // }

}

module.exports = authorize;