const Router = require('koa-router');
const Money = new Router();
const money = require('../controlers/money');
const bodyparser = require('koa-bodyparser');


Money.post('/pay', bodyparser(), money.pay);
Money.post('/cancel', bodyparser(), money.cancel);





module.exports = Money;