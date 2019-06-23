require('dotenv').config;

const server = require('./server')

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
server.listen(port, function () {
    console.log('Server listening on port ' + port);
});