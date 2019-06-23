const express = require('express')
const router = express.Router()
const authorize = require('../_helpers/authorize')
const userService = require('./user.service')
const Role = require('../_helpers/role')

const authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res
                    .status(400)
                    .json({
                        message: 'username or password is incorrect'
                    })
            }
        })
        .catch(err => next(err));
}

const getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

const getById = (req, res, next) => {
    const currentUser = req.decodedToken;
    const id = parseInt(req.params.id);

    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res
            .status(401)
            .json({
                message: 'Unauthorized'
            });
    }

    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(err => next(err));
}
router
    .post('/authenticate', authenticate)
    .get('/', authorize, getAll)
    .get('/:id', authorize, getById)

module.exports = router