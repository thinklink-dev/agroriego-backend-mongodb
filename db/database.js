const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'piloto2021',
    database: 'agroriego'
    /*multipleStatements: true*/
});

mysqlConnection.connect(function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Agroriego WebService successfully conected!');
    }
});

module.exports = mysqlConnection;