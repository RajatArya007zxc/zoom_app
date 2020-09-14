const express=require('express');
const app =express();
const server=require('http').Server(app);
const {v4:uuidv4} =require('uuid');
const io=require('socket.io')(server);


const {ExpressPeerServer} =require('peer');
const peerServer=ExpressPeerServer(server,{
  debug:true
})


app.use('/peerjs',peerServer)
app.use(express.static('public')) //this is used to public the script file




//for ejs
app.set('view engine','ejs')

//first url 
app.get('/',(req,res)=>{

  res.redirect(`${uuidv4()}`)

})


app.get('/:room',(req,res)=>{

    res.render('room',{roomId: req.params.room})
})


io.on('connection',socket=>{
  socket.on('join-room',(room_Id,userId)=>{
   socket.join(room_Id);
   socket.to(room_Id).broadcast.emit('user-connected',userId);  //to inform other user to add that person on our stream
  })
})





server.listen(3030);