const ApiError  = require("../exeptions/api-error")
const tokenS = require("../service/Token");
const timerModule = require("../module/timer");
const uuid = require('uuid').v4;

class Timer {
    async create(cxt){
        const {userId, aToken,timer, date , money} = cxt.request.body;

        if(!userId || !aToken || !timer || !date || !money){
            throw ApiError.BadRequest();
        }
        if(!tokenS.verifyToken(aToken)){
            cxt.status = 200;
            cxt.body = {
                answer : "invalid access token"
            }
        }
        let timerId = uuid();

        await timerModule.create(userId, timerId, timer, date , money)
            .then(answer => {
                console.log(1);
                cxt.status = 200;
                cxt.body = {
                    answer : "task success save",
                    postId : timerId
                }
            })
            .catch( err => console.log(err));

    }
    async delete(cxt){
        const {userId, aToken, timerId} = cxt.request.body;
        if(!userId || !aToken || !timerId ){
            throw ApiError.BadRequest();
        }
        if(!tokenS.verifyToken(aToken)){
            cxt.status = 200;
            cxt.body = {
                answer : "invalid access token"
            }
        }
        await timerModule.delete(userId,timerId)
            .then(answer => {
                cxt.status = 200;
                cxt.body = {
                    answer : "success delete"
                }
            })
            .catch(err => ApiError.ServerError())

    }
    async getAll(cxt){
        const {userId, aToken} = cxt.request.body;
        if(!userId || !aToken){
            ApiError.BadRequest();
        }
        if(!tokenS.verifyToken(aToken)){
            cxt.status = 200;
            cxt.body = {
                answer : "invalid access token"
            }
        }

        timerModule.getAll(userId)
            .then(answer => {
                cxt.status = 200;

                cxt.body = {
                    answers : answer[0]
                }
            })
            .catch(err => console.log(err))
        return 0;

    }
    async getOne(cxt){
        const {userId, aToken, timerId} = cxt.request.body;
        if(!userId || !aToken || !timerId ){
            throw ApiError.BadRequest();
        }
        if(!tokenS.verifyToken(aToken)){
            cxt.status = 200;
            cxt.body = {
                answer : "invalid access token"
            }
        }
        await timerModule.getOne(userId,timerId)
            .then(answer => {
                cxt.status = 200;
                console.log(answer)
                cxt.body = {
                    answer : answer[0][0]
                }
            })
            .catch(err => console.log(err))
    }
}

module.exports = new Timer();