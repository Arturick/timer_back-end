const moneyModule = require('../module/money')
const YooKassa = require('yookassa');
const tokenS = require("../service/Token");
const yooKassa = new YooKassa({
    shopId: '891469',
    secretKey: 'test_rCfC5LlYkHzbSsC4_OW3AmGipI-mykEykUrQwungByc'
});


class Money {

    async pay(cxt){
        const {sum, aToken} = cxt.request.body;
        if (!sum || !aToken) throw ApiError.BadRequest();
        if(!tokenS.verifyToken(aToken)){
            cxt.status = 200;
            return cxt.body = {
                answer : "invalid access token"
            }
        }
        const payment = await yooKassa.createPayment({
            amount: {
                value: sum,
                currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card"
            },
            confirmation: {
                type: "redirect",
                return_url: "https://github.com/olegpolyakov/yookassa"
            },
            description: ""
        });

        let url = payment.confirmation.confirmation_url
        let payId = payment.id
        await  moneyModule.create(payId,sum)
        cxt.status = 200;
        cxt.body = {
            "payId" : payId,
            "payUrl" : url
        }
    }

    async cancel(cxt){
        const {id, aToken} = cxt.request.body;
        if (!id || !aToken) throw ApiError.BadRequest();


        let money = await  moneyModule.getPay(id)
            .then(answer => {
                if(answer[0][0]){
                    return answer[0][0].sum
                }
            })
        if(!tokenS.verifyToken(aToken)){
            cxt.status = 200;
            return cxt.body = {
                answer : "invalid access token"
            }
        }
        const payment = await yooKassa.createRefund({
            "amount": {
                "value": money,
                "currency": "RUB"
            },
            "payment_id": id
        });



        await moneyModule.cancel(id)




























        cxt.status = 200;
        cxt.body = {
            "answer" : "success",

        }
    }

}

module.exports = new Money()