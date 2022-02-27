const spamModel = require('../module/spam');

const spamLog = {
    async checkLogin(ip){
        await spamModel.select(ip ,"login")
            .then(answer => {
               if(answer[0][0].count > 10){
                   return null;
               }

            });
        await spamModel.add(ip, 'login')
        await spamModel.delete(ip, 'login')

                },
    async checkChange(ip){
        await spamModel.select(ip ,"change")
            .then(answer => {
                console.log(answer[0][0].count > 10);
                if(answer[0][0].count > 10){
                    return null;
                }

            });
        await spamModel.add(ip, "change")
        await spamModel.delete(ip, "change")
        return true;
    }
}

module.exports = spamLog;