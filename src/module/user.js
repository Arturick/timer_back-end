const mysql         = require('mysql2');
const config		= require('../../data/config');
const md5 			= require('md5');
const connection    = mysql.createPool(config.db).promise();
const uuid = require('uuid').v4

const userModule = {
    register : async (email, password, userId) =>
        connection.query(
         `INSERT INTO users (email, password, id, link , activate , resetCode) 
        VALUES ('${email}', '${md5(password)}' , '${userId}', '${uuid()}' , 'false' , '${uuid()}')`
    ),
    login : async (email, password) =>
        connection.query(`SELECT * FROM users WHERE email = "${email}" AND password = "${md5(password)}"`),

    changeLog : async (email, validCode, change, newValid) =>
        connection.query(`UPDATE users SET ${change} = '${newValid}' WHERE email = '${email}' AND resetCode = '${validCode}'`),

    confirmEmail : async (link) =>
        connection.query(`UPDATE users SET activate = true WHERE link = '${link}'`),
    updateCode : async (email,code, newCode) =>
        connection.query(`UPDATE users SET resetCode = '${newCode}' WHERE resetCode = '${code}' AND email = '${email}'`),
    getLink : async (email) =>
        connection.query(`SELECT link FROM users WHERE email = "${email}"`),
    findOne : async (email) =>
        connection.query(`SELECT count(*) FROM users WHERE email = "${email}"`),
    getCode : async (email) =>
        connection.query(`SELECT resetCode FROM users WHERE email = "${email}"`)

}

module.exports = userModule;