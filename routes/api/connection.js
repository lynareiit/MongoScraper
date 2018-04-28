var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'ixqxr3ajmyapuwmi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'b5gaqhsln3kimhhl',
        password: 'gjhwn1cftg3s0eh6',
        database: 'yj3sb7e0cv968ag6'
    })
};

connection.connect();
module.exports = connection;