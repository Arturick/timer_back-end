const Router = require('koa-router');
const Timer = new Router();
const timer = require('../controlers/timer');
const bodyparser = require('koa-bodyparser');


Timer.post('/create', bodyparser(), timer.create);
Timer.post('/delete', bodyparser(), timer.delete);
Timer.post('/getAll',bodyparser(), timer.getAll);
Timer.post('/getOne', bodyparser(), timer.getOne);




module.exports = Timer;