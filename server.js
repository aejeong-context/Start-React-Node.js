const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.get('/api/hello',(req,res)=>{
//     res.send({message:'Hello Express!'});

// });
app.get('/api/customers',(req,res)=>{
    res.send([
        {
        'id':1,
        'image':'https://placeimg.com/64/64/3',
        'name':'신애정',
        'birthday':'940605',
        'gender':'여자',
        'job':'무직'
      },
      {
        'id':2,
        'image':'https://placeimg.com/64/64/2',
        'name':'양지수',
        'birthday':'960910',
        'gender':'남자',
        'job':'무직'
      }
      
      ]);
});
app.listen(port,()=>console.log(`Listening on port ${port}`));
