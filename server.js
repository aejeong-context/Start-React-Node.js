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
connection.connect();
const multer = require('multer');
const upload = multer({dest:'./upload'});

app.get('/api/customers',(req,res)=>{
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDELETED = 0 ",
        (err,rows,fields)=>{
          //배열형태로 가지고온다
          //fields - 결과값 화면 출력 
          res.send(rows);
        }
      
      );
});

app.delete('/api/costomers/:id',(req,res)=>{
  let sql = 'UPADTE CUSTOMER SET isDeleted = 1 WHERE id =?';
  let params = [req.params.id];
  connection.query(sql,params,(err,rows,fields)=>{
    res.send(rows);
  })
});

//이미지 폴더로 접근 실제 경로는 upload
app.use('/image',express.static('./upload'));
app.post('/api/customers',upload.single('image'),(req,res)=>{
  let sql = 'INSERT INTO CUSTOMER VALUES(null,?,?,?,?,now(),0)';
  let image = '/image/'+req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let job = req.body.job;
  let params = [image,name,birthday,job];
  connection.query(sql,params,
    (err,rows,fields)=>{
    res.send(rows);
  })
})
app.listen(port,()=>console.log(`Listening on port ${port}`));
