require('dotenv').config();
const useMiddleware = require('../_helpers/use-middleware');
const errorHandler = require('../_helpers/error-handler');
const express = require('express');
const app = express();

//use json parser
app.use(express.json());

//use middleware
useMiddleware(app);

app.get('/', (req, res) => {
    res.json('Welcome')
})

// api routes
app.use('/users', require('../users/user.controller'));


// global error handler
app.use(errorHandler);

module.exports = app