const ApiError  = require("../exeptions/api-error")
const userModule = require("../module/user");
const token = require("../service/Token");
const emailService = require("../service/email");
const uuid = require('uuid').v4
const spamLog = require("../service/spam")

class User {
    async refreshToken(cxt){
        const {userId, rToken} = cxt.request.body;
        if (!userId || !rToken) throw ApiError.BadRequest();
        let tokens = await token.update(userId, rToken);
        if(!tokens)throw ApiError.BadRequest();
        cxt.status = 200;
        cxt.body = {
            "tokens" : tokens
        }
    }

    async register(cxt) {

        const {email, password} = cxt.request.body;
        if (!email || !password) throw ApiError.BadRequest();

        await userModule.findOne(email)
            .then(answer => {
                if (answer[0].count > 0) {
                    cxt.body = {
                        answer: 'данный email уже зарегестрирован'

                    }
                    return 0;
                }
            })
            .catch(error => {
                throw ApiError.ServerError();
            })
        let userId = uuid();
        let tokens = await token.createToken(userId);
        await userModule.register(email, password, userId)
            .then(answer => {

                emailService.confirmLink(email);
                cxt.status = 200;
                cxt.body = {
                    "tokens" : tokens,
                    answ: "аккаунт цспешно создан подтвердите email"
                }

            }).catch(error => {
                console.log(error)
                throw ApiError.ServerError();
            })


    }

    async login(cxt) {
        const {email, password} = cxt.request.body;
        if (!email || !password) throw ApiError.BadRequest();


        if(!await spamLog.checkLogin(cxt.request.ip)){
            cxt.status = 200;
            cxt.body = {
                answ : "слишком часто логинитесь"
            }
        }
        await userModule.login(email, password)
            .then(async answer => {
                if (!answer[0][0]) {
                    throw ApiError.NotFound();
                }

                if (!answer[0][0].activate) {
                    cxt.status = 200;
                    cxt.body = {
                        answ: "not confirm email"
                    }

                    return 0;
                }

                let tokens = await token.createToken(answer[0][0].id)
                console.log(tokens)
                cxt.status = 200;
                cxt.body = {
                    "tokens": tokens,
                    user: answer[0][0]
                }

            })
            .catch(error => {
                throw ApiError.ServerError();
            })

    }

    async logout(cxt) {
        const {refreshToken, userId} = cxt.request.body;
        if (!refreshToken || !userId) throw ApiError.BadRequest();
        await token.delete(userId);
        cxt.status = 200;

    }

    async changeLog(cxt) {
        const {email, change, validCode, newValid} = cxt.request.body;
        if (!email || !validCode || !change || !newValid) throw ApiError.BadRequest();
        if(!await spamLog.checkChange(cxt.request.ip)){
            cxt.status = 200;
            cxt.body = {
                answ : "слишком часто меняете данные"
            }
        }
        let newCode = uuid();
        await userModule.updateCode(email,validCode,newCode)
        await userModule.changeLog(email, newCode, change, newValid)


        cxt.status = 200;

    }

    async confirmEmail(cxt) {
        if (!cxt.params.code) {
            throw ApiError.BadRequest();
        }
        console.log(cxt.params.code)
        await userModule.confirmEmail(cxt.params.code)
            .then(answer => cxt.status = 200)
            .catch(err => ApiError.ServerError());


    }

    async sendCode(cxt) {
        const {email} = cxt.request.body;

        let code = await userModule.getCode(email)
            .then(answer => {
                if (!answer[0][0]) {
                    throw  ApiError.BadRequest()
                }

                return answer[0][0].resetCode
            });

        emailService.sendCode(email, code);
        cxt.status = 200;

    }
}

module.exports = new User();
