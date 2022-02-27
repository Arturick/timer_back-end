/*
*/

let Koa = require('koa');
let Router = require('koa-router');
const app = new Koa();
const router = new Router();

const ApiError = require("./src/exeptions/api-error")
const bodyParser = require("koa-bodyparser");
const userMW = require("./src/midleware/user-error");
const config = require("./data/config");

const User = require("./src/router/user");
const Task = require("./src/router/task");
const Timer = require("./src/router/timer")
const Post = require("./src/router/post")


router.use('/user', User.routes());
router.use('/task', Task.routes());
router.use('/timer', Timer.routes());
router.use('/post', Post.routes());

app.use(router.routes());
app.use(bodyParser());
app.use(userMW);



if (!module.parent) {
    app.listen(config.PORT,() => {
        console.log(`server in: 127.0.0.1:${config.PORT}`);
    });
}
