const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//정보 받아와서
const data = fs.readFileSync('./database.json');
//json형태로 편환
const conf = JSON.parse(data);
const mysql = require('mysql');

//database 연결부분
const connection = mysql.createConnection({
  host:conf.host,
  user:conf.user,
  password:conf.password,
  port:conf.port,
  database:conf.database

});

app.get('/api/customers',(req,res)=>{
  connection.query(
    "SELECT * FROM CUSTOMER",
        (err,rows,fields)=>{
          //배열형태로 가지고온다
          //fields - 결과값 화면 출력 
          res.send(rows);
        }
      
      );
});
app.listen(port,()=>console.log(`Listening on port ${port}`));
