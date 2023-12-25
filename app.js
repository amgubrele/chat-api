const express=require('express')
const path=require('path')
const { Socket } = require('socket.io')
const app= express()
const PORT=process.env.PORT || 4000
const server=app.listen(PORT,()=>console.log(`server on port ${PORT}`))



const io=require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))


io.on('connection',onconnected)

let socketsConnected=new Set()

function onconnected(socket)
{
    console.log(path.join(__dirname,'public','index.html'))
    console.log(socket.id)
    socketsConnected.add(socket.id)

    io.emit('client-total',socketsConnected.size)


    socket.on('disconnect',()=>{
        console.log('socket disconnect',socket.id)
        socketsConnected.delete(socket.id)
        io.emit('clients-total',socketsConnected.size)
    })

    socket.on('message',(data)=>{
        console.log(data)
        socket.broadcast.emit('chat-message',data)
    })

}


// socket.on('message',(data)=>{

// })
