require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { Server } = require('socket.io')
const ACTIONS = require('./actions')
PORT = process.env.PORT ||  5000
const { addUser, findUser, getRoomUsers, removeUser } = require("./users");

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
    socket.on(ACTIONS.JOIN,config=>{
        const {roomId} = config
        console.log(roomId)
        //const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        //socket.emit('StartPrepareCamera');
        socket.on('pressJoin',(userData)=> {
            console.log(userData)
            const {user} = addUser({name:userData.name, room:roomId,isMicro:userData.isMicro,isCamera:userData.isCamera,id:socket.id})
            console.log(`${socket.id} joined`)
            console.log(getRoomUsers(roomId))

            socket.broadcast.to(user.room).emit("Notification", {
                message: `${user.name} has joined`
            });
        const clients = getRoomUsers(roomId);
            clients.forEach(client => {
                io.to(client.id).emit(ACTIONS.ADD_PEER, {
                    peerID: socket.id,
                    createOffer: false
                });

                socket.emit(ACTIONS.ADD_PEER, {
                    peerID: client.id,
                    createOffer: true,
                });
            });

            socket.join(roomId)
            io.to(user.room).emit("UsersInRoom", {
                users: getRoomUsers(user.room)
            });
            socket.on("disconnect", ()=>{
                removeUser(user)
                console.log(`socket - ${socket.id} disconnected`)
                io.to(user.room).emit("Notification", {
                    message: `${user.name} has left`
                });
            })
        })


    })
})

httpServer.listen(PORT,()=>{
    console.log(`server is running on port - ${PORT}`)
})