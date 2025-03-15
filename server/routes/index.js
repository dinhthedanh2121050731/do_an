const homeRouter = require('./home');
const artistsRouter = require('./artists');
const usersRouter = require('./users');
const searchRouter = require('./search');
function route(app) {
    app.use('/artists', artistsRouter);
    app.use('/auth', usersRouter);
    app.use('/search', searchRouter);
    app.use('/', homeRouter);
}

module.exports = route;
