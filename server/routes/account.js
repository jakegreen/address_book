module.exports = function (app, passport, account) {
    app.get('/account/loggedin', account.loggedin);
    app.post('/account/login', passport.authenticate('local'), account.login);
    app.post('/account/logout', account.logout);
    app.get('/account/register', account.register);
    app.post('/account/register', account.register_p);
    app.get('/api/account/:id', account.getAccount);
    app.put('/api/account/:id', account.putAccount);
};