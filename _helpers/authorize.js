const jwt = require('jsonwebtoken');
const Role = require('./role');


const authorize = (roles = []) => {



    return (req, res, next) => {
        const token = req.headers.authorization;

        jwt.verify(
            token,
            process.env.SECRET,
            (err, decodedToken) => {
                if (err) {
                    // err.status = 401
                    next(err)
                } else {
                    req.decodedToken = decodedToken
                    // console.log(decodedToken)

                    if (roles.length && !roles.includes(req.decodedToken.role)) {
                        // user's role is not authorized
                        return res.status(401).json({
                            message: 'Unauthorized'
                        });
                    }

                    next()
                }
            }
        )
    }


}

module.exports = authorize;