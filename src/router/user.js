const Router = require('koa-router');
const User = new Router();
const user = require('../controlers/user.js');
const bodyparser = require('koa-bodyparser');


User.post('/register', bodyparser(), user.register);
User.post('/login', bodyparser(), user.login);
User.post('/logout',bodyparser(), user.logout);
User.post('/changeLog',bodyparser(), user.changeLog);
User.get('/confirmEmail/:code', bodyparser(), user.confirmEmail);
User.post('/sendCode', bodyparser(), user.sendCode);
User.post('/refresh', bodyparser(), user.refreshToken);




module.exports = User;