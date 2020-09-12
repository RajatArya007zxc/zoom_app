const express=require('express');
const app =express();
const server=require('http').Server(app);

//for ejs

app.set('view engine','ejs')

//first url 
app.get('/',(req,res)=>{

  res.render('room');

})

server.listen(3030);