const  ApiError = require('../exeptions/api-error')

function userMW(err, cxt) {

    if(err instanceof ApiError){
        console.error(err)
        cxt.body = { message : err.message, errors : err.errors};



    }

    return cxt.status = 501, cxt.body = {errors : ['не предвиденая ошибка']};

}

module.exports = userMW;