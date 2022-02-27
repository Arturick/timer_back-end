module.exports = class ApiError extends Error {
    status;node
    errors;

    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static UnauthorizedError(){
        return new  ApiError(401)
    }
    static BadRequest(){
        return new  ApiError(400)
    }
    static ForbiddenRequest(){
        return new ApiError(403);
    }
    static NotFound(){
        return new ApiError(404);
    }
    static NotAcceptable(){
        return new ApiError(406);
    }
    static GoneRequest(){
        return new ApiError(410);
    }
    static ServerError(){
        return new ApiError(500);
    }
}