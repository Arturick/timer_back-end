const mysql         = require('mysql2');
const config		= require('../../data/config');
const connection    = mysql.createPool(config.db).promise();

const moneyModule = {
    create : async (id,money) =>
        connection.query(`INSERT INTO money (id, money) 
        VALUES ('${id}', '${money}'`),
    cancel : async (id) =>
        connection.query(`DELETE FROM money WHERE id = '${id}'`),
    getPay : async (id) =>
        connection.query(`SELECT * From money WHERE id = '${id}' `)
}

module.exports = moneyModule;