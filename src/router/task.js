const Router = require('koa-router');
const Task = new Router();
const task = require('../controlers/task');
const bodyparser = require('koa-bodyparser');


Task.post('/create', bodyparser(), task.create);
Task.post('/delete', bodyparser(), task.delete);
Task.post('/getAll',bodyparser(), task.getAll);




module.exports = Task;