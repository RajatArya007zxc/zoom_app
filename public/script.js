

const socket=io('/')

const videoGrid=document.getElementById('video-grid')
//console.log(videoGrid);
const myVideo=document.createElement('video');
myVideo.muted =true;

const peer=new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'3030'
})




let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    myVideoStream=stream;
    addVideoStream(myVideo,stream)

peer.on('call',call=>{
    call.answer(stream);
    const video=document.createElement('video');
call.on('stream',userVideoStream=>{
    addVideoStream(video,userVideoStream)
})
})




    socket.on('user-connected',(userId)=>{
        connectNewUser(userId,stream)
        })
        
})


peer.on('open',id=>{
    socket.emit('join-room',Room_id,id);
})

//socket.emit('join-room',Room_id,id);

// socket.on('user-connected',(userId)=>{
// connectNewUser(userId,stream)
// })

const connectNewUser=(userId,stream)=>{
//console.log(userId) user ki id hai 
const call=peer.call(userId,stream)
const video=document.createElement('video')
call.on('stream',userVideoStream=>{
    addVideoStream(video,userVideoStream)
})
}


////////////



const addVideoStream=(video,stream)=>{
    video.srcObject=stream
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })

    videoGrid.append(video)

}