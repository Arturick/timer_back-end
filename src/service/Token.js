const jwt = require('jsonwebtoken');
const config = require("../../data/config")
const uuid = require('uuid').v4;
const tokenModel = require('../module/token');

const token = {
    async createToken(userId){
        let aToken = jwt.sign({data: userId}, config.secretJWT, { expiresIn: '1h' });
        let refresh = uuid();
        await tokenModel.delete(userId);

        await tokenModel.add(userId,refresh);

        return  {refreshToken : refresh, accessToken : aToken}

    },
    async delete(userId){
        await tokenModel.delete(userId);
    },
    verifyToken(token) {
        return jwt.verify(token, config.secretJWT);
    },
    async update(userId, rToken){
        await tokenModel.find(userId, rToken)
            .then(answer => {
                if(!answer[0][0]){
                    return null;
                }
            })
        let aToken = jwt.sign({data: userId}, config.secretJWT, { expiresIn: '1h' });
        let refresh = uuid();
        await tokenModel.delete(userId);

        await tokenModel.add(userId,refresh);

        return {refreshToken : refresh, accessToken : aToken}

    }
}

module.exports = token;