const mysql         = require('mysql2');
const config		= require('../../data/config');
const md5 			= require('md5');
const connection    = mysql.createPool(config.db).promise();


const tokenModel = {
    add: async (userId, refresh) =>
        connection.query(`INSERT INTO token (id,code) VALUES('${userId}', '${refresh}')`),
    delete: async (userId) =>
        connection.query(`DELETE FROM token WHERE id = '${userId}'`),
    find: async (userId, refresh) =>
        connection.query(`SELECT * FROM token WHERE id = '${userId}' AND code = '${refresh}'`)
}

module.exports = tokenModel;