const ApiError  = require("../exeptions/api-error")
const tokenS = require("../service/Token");
const postModule = require("../module/post");
const uuid = require('uuid').v4;
const config = require("../../data/config")

class  Post {
    async create(cxt){
        const {userId, password, title, main} = cxt.request.body;

        if(!userId || !password || !title || !main ){
            throw ApiError.BadRequest();
        }

        if(config.postPassword != password){
            cxt.body = 'wrongPassword'
        }

        let postId = uuid();
        await postModule.create(userId,postId ,title, main)
            .then(answer => {
                cxt.status = 200;
                cxt.body = {
                    answer : "task success save",
                    postId : postId
                }
            })
            .catch( err => ApiError.ServerError());



    }

    async delete(cxt){
        const {userId,password , postId} = cxt.request.body;
        if(!userId || !password || !postId ){
            throw ApiError.BadRequest();
        }
        if(config.postPassword != password) {
            cxt.body = 'wrongPassword'
        }

        await postModule.delete(userId, postId)
            .then(answer => {
                cxt.status = 200;
                cxt.body = {
                    answer : "success delete"
                }
            })
            .catch(err => ApiError.ServerError())
    }
    async getAll(cxt){
        const {userId, password} = cxt.request.body;
        if(!userId || !password){
            ApiError.BadRequest();
        }
        if(config.postPassword != password) {
            cxt.body = 'wrongPassword'
        }


        postModule.getAll(userId)
            .then(answer => {

                cxt.status = 200;
                cxt.body = {
                    answers : answer[0]
                }
                console.log(answer[0])
            })
            .catch(err => ApiError.ServerError())

    }
    async getOne(cxt){
        const  {userId, password, postId} = cxt.request.body;
        if(!userId || !password || !postId){
            ApiError.BadRequest();
        }
        if(config.postPassword != password) {
            cxt.body = 'wrongPassword'
        }

        postModule.getOne(userId, postId)
            .then( answer => {
                cxt.status = 200;
                cxt.body = {
                    answers : answer[0][0]
                }
            })
    }

}

module.exports = new Post();