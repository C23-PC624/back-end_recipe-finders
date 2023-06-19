const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'kepoya',
    user: 'kepoya',
    database: 'kepoya',
    password: 'kepoya'
});

module.exports = connection;