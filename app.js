/*
*/

let Koa = require('koa');
let Router = require('koa-router');
let cors = require('@koa/cors');

const app = new Koa();
app.use(cors({
    credentials: true,
    origin: '*'
}))
const router = new Router();

const ApiError = require("./src/exeptions/api-error")
const bodyParser = require("koa-bodyparser");
const userMW = require("./src/midleware/user-error");
const config = require("./data/config");

const User = require("./src/router/user");
const Task = require("./src/router/task");
const Timer = require("./src/router/timer")
const Post = require("./src/router/post")
const Money = require("./src/router/money")


router.use('/user', User.routes());
router.use('/task', Task.routes());
router.use('/timer', Timer.routes());
router.use('/post', Post.routes());
router.use('/money', Money.routes());








if (!module.parent) {
    app
        .use(router.routes())
        .use(bodyParser())
        .use(userMW)
        .listen(config.PORT,() => {
        console.log(`server in: 127.0.0.1:${config.PORT}`);
    });
}
