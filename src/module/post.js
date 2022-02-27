const mysql         = require('mysql2');
const config		= require('../../data/config');
const connection    = mysql.createPool(config.db).promise();

const postModule = {
    create : async (userId, postId ,title, main) =>
        connection.query(`INSERT INTO posts (userId, postId ,title, main) 
        VALUES ('${userId}', '${postId}', '${title}', '${main}'`),
    delete : async (userId, postId) =>
        connection.query(`DELETE FROM posts WHERE userId = '${userId}' AND postId = '${postId}'`),
    getAll : async (userId) =>
        connection.query(`SELECT * FROM posts WHERE  userId = '${userId}'`),
    getOne : async (userId, postId) =>
        connection.query(`SELECT * FROM posts WHERE  userId = '${userId}' AND postId = '${postId}'`)

}

module.exports = postModule;