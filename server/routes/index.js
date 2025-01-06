const homeRouter = require('./home');
const artistsRouter = require('./artists');
const usersRouter = require('./users');
function route(app) {
    app.use('/artists', artistsRouter);
    app.use('/user', usersRouter);
    app.use('/', homeRouter);
}

module.exports = route;
