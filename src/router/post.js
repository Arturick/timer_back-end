const Router = require('koa-router');
const Post = new Router();
const post = require('../controlers/post');
const bodyparser = require('koa-bodyparser');


Post.post('/create', bodyparser(), post.create);
Post.post('/delete', bodyparser(), post.delete);
Post.post('/getAll',bodyparser(), post.getAll);
Post.post('/getOne', bodyparser(), post.getOne);




module.exports = Post;