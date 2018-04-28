var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 's554ongw9quh1xjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'gjpbko5zqq1wruzc',
        password: 'n1b7iporye5zsk7n',
        port: '3306',
        database: 'lwtkpwcatgqysen5'
    })
};

connection.connect();
module.exports = connection;