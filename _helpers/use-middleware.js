const middlewareList = [
    require('cors'),
    require('morgan'),
    require('helmet')
]

module.exports = app => {
    middlewareList.forEach(middleware => {
        app.use(middleware())
    });
}