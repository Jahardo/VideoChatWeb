import express from "express";
import {Server} from 'socket.io';
const PORT = process.env.PORT ||  5000


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

interface IUser {
    userName: string;
}

interface RoomTo {
    roomId:string,
    userName:string
}

const rooms: Record<string, Record<string, IUser>> = {};

io.on('connection', socket => {
    console.log(`connected socket ${socket.id}`)
    const joinRoom = ({ roomId, userName }:RoomTo) => {
        if (!rooms[roomId]) rooms[roomId] = {};
        console.log("user joined the room", roomId, userName);
        rooms[roomId][socket.id] = { userName };
        socket.join(roomId);
        socket.to(roomId).emit('')
        socket.to(roomId).emit("user-joined", { userId:socket.id, userName });
        // socket.emit("get-users", {
        //     roomId,
        //     participants: rooms[roomId],
        // });

        socket.on("disconnect", () => {
            console.log("user left the room", socket.id);
            leaveRoom({ roomId, userId:socket.id});
        });
    };

    const leaveRoom = ({ userId, roomId }:{userId:string,roomId:string}) => {
        // rooms[roomId] = rooms[roomId]?.filter((id) => id !== peerId);
        socket.to(roomId).emit("user-disconnected", userId);
    };
    socket.on('join-room',joinRoom);
});



httpServer.listen(PORT,()=>{
    console.log(`server is running on port - ${PORT}`)
})