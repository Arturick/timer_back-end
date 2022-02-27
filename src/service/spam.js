const spamModel = require('../module/spam');

const spamLog = {
    async checkLogin(ip){
        let answ = 0;
        await spamModel.select("login")
            .then(answer => {
               console.log(answer[0][0])
               if(answer[0][0].count > 10){
                   answ = 1;
                   return null;
               }

            });
        if(answ==1)return null;
        await spamModel.add(ip, 'login')
        await spamModel.delete(ip, 'login')
        return true;
                },
    async checkChange(ip){
        let answ = 0;
        await spamModel.select("change")
            .then(answer => {
                console.log(answer[0][0]['count(*)'] > 10);
                if(answer[0][0].count > 10){
                    answ = 1;
                    return null;
                }

            });
        if(answ==1)return null;
        await spamModel.add(ip, "change")
        await spamModel.delete(ip, "change")
        return true;
    }
}

module.exports = spamLog;