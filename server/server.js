require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { Server } = require('socket.io')
const ACTIONS = require('./actions')
PORT = process.env.PORT ||  5000


const app = express();
const httpServer = require('http').createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:['http://localhost:3001'],
    }
})


app.get("/" , (req,res)=> {
    res.json({data:"hi"});
})

io.on('connection',socket=>{
    console.log('connection ready')
    socket.on('shareRoomId',config=>{
        const {roomId} = config
        console.log(roomId)
        const {rooms: joinedRooms} = socket;

        if (Array.from(joinedRooms).includes(roomId)) {
            return console.warn(`Already joined to ${roomId}`);
        }
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        console.log(clients.length);
        if(clients.length){
            socket.emit('NotExistRoom')
        }
        else {
            socket.emit('StartPrepareCamera')
        }


    })
})

httpServer.listen(PORT,()=>{
    console.log(`server is running on port - ${PORT}`)
})