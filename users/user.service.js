// const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [{
        id: 1,
        username: 'admin',
        password: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        role: Role.Admin
    },
    {
        id: 2,
        username: 'user',
        password: 'user',
        firstName: 'Normal',
        lastName: 'User',
        role: Role.User
    }
];

const authenticate = async ({
    username,
    password
}) => {
    const user = users.find(u => {
        return u.username === username &&
            u.password === password
    })

    if (user) {
        const token = jwt.sign({
            sub: user.id,
            role: user.role
        }, process.env.SECRET);

        const {
            password,
            ...userWithoutPassword
        } = user;

        return {
            ...userWithoutPassword,
            token
        };
    }
}

const getAll = async () => {
    return user.map(u => {
        const {
            password,
            ...userWithoutPassword
        } = u;

        return userWithoutPassword;
    });
}

const getById = async (id) => {
    const user = users.find(u => {
        return u.id === parseInt(id)
    });

    if (!user) return;

    const {
        password,
        ...userWithoutPassword
    } = user;

    return userWithoutPassword;
}

module.exports = {
    authenticate,
    getAll,
    getById
};