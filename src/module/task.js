const mysql         = require('mysql2');
const config		= require('../../data/config');
const connection    = mysql.createPool(config.db).promise();


const taskModule = {
    create : async (userId, taskId, title, main, color, date) =>
        connection.query(`INSERT INTO tasks (userId, taskId, title, main, color, date) 
        VALUES ('${userId}', '${taskId}', '${title}', '${main}', '${color}', '${date}')`),
    delete : async (userId, taskId) =>
        connection.query(`DELETE FROM tasks WHERE userId = '${userId}' AND taskId = '${taskId}'`),
    getAll : async (userId) =>
        connection.query(`SELECT * FROM tasks WHERE  userId = '${userId}'`)
}

module.exports = taskModule;