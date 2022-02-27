const mysql         = require('mysql2');
const config		= require('../../data/config');
const connection    = mysql.createPool(config.db).promise();

const timerModule = {
    create : async (userId, timerId,timer, start, money) =>
        connection.query(`INSERT INTO timers (userId, timerId,timer, start, money) 
        VALUES ('${userId}', '${timerId}', '${timer}', '${start}', '${money}')`),
    delete : async (userId, timerId) =>
        connection.query(`DELETE FROM timers WHERE userId = '${userId}' AND timerId = '${timerId}'`),
    getAll : async (userId) =>
        connection.query(`SELECT * FROM timers WHERE  userId = '${userId}'`),
    getOne : async (userId, timerId) =>
        connection.query(`SELECT * FROM timers WHERE  userId = '${userId}' AND timerId = '${timerId}'`)

}

module.exports = timerModule;