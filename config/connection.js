var mysql = require("mysql");
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'library'
});

con.connect(
    (err) => {
        if(!err){
            console.log('Connected');
        }else {
            console.log('Error connection')
        }
    }
);

module.exports=con;