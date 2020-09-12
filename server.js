const express=require('express');
const app =express();
const server=require('http').Server(app);
const {v4:uuidv4} =require('uuid');

//for ejs
app.set('view engine','ejs')

//first url 
app.get('/',(req,res)=>{

  res.redirect(`${uuidv4()}`)

})


app.get('/:room',(req,res)=>{

    res.render('room',{roomId: req.params.room})
})

server.listen(3030);