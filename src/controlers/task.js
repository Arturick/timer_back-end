const ApiError  = require("../exeptions/api-error")
const tokenS = require("../service/Token");
const taskModule = require("../module/task");
const uuid = require('uuid').v4;

class Task {
    async create(cxt){
        const {userId, aToken, title, main, color, date} = cxt.request.body;

        if(!userId || !aToken || !title || !main || !color || !date){
            throw ApiError.BadRequest();
        }

        if(!tokenS.verifyToken(aToken)){
            cxt.status = 200;
            cxt.body = {
                answer : "invalid access token"
            }
        }

        let taskId = uuid();
        await taskModule.create(userId,taskId ,title, main, color, date)
            .then(answer => {
                cxt.status = 200;
                cxt.body = {
                    answer : "task success save",
                    postId : taskId
                }
            })
            .catch( err => ApiError.ServerError());



    }

    async delete(cxt){
        const {userId, aToken, taskId} = cxt.request.body;
        if(!userId || !aToken || !taskId ){
            throw ApiError.BadRequest();
        }
        if(!tokenS.verifyToken(aToken)){
            cxt.status = 200;
            cxt.body = {
                answer : "invalid access token"
            }
        }
        await taskModule.delete(userId,taskId)
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

        taskModule.getAll(userId)
            .then(answer => {

                cxt.status = 200;
                cxt.body = {
                    answers : answer[0]
                }
                console.log(answer[0])
            })
            .catch(err => ApiError.ServerError())

    }

}

module.exports = new Task();