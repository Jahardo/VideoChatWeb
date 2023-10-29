import express from "express";
import {Server} from 'socket.io';

const PORT = process.env.PORT || 3000
import http from 'http'

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3001'],
    }
})


app.get("/", (req, res) => {
    res.json({data: "hi"});
})

interface IUser {
    roomId: string
    userName: string;
    userId: string
    isMicro:boolean,
    isCamera:boolean,
}

interface RoomTo {
    roomId: string,
    userName?: string
}

const rooms: Record<string, Record<string, IUser>> = {};

io.on('connection', socket => {
    console.log(`connected socket ${socket.id}`)

    const CreateUser = ({roomId, userName}: IUser) => {
        if (!rooms[roomId]) {
            rooms[roomId] = {}
        }
        rooms[roomId][socket.id] = {userName, roomId, userId: socket.id,isMicro:true,isCamera:true}
        console.log(rooms)
    }

    const joinRoom = ({roomId}: RoomTo) => {
        console.log(`user - ${rooms[roomId][socket.id].userName}`);

        const users = rooms[roomId];
        Object.values(users).filter(user=>user.userId !==socket.id).forEach(user => {
            io.to(user.userId).emit("ADD_PEER", {
                peerID: socket.id,
                createOffer: false,
            });

            socket.emit("ADD_PEER", {
                peerID: user.userId,
                createOffer: true,
            });
        });
        Object.values(users).filter(user=>user.userId !==socket.id).forEach(user => {
            io.to(roomId).emit("user-joined", users[socket.id]);
        });

        socket.join(roomId);
        io.to(roomId).emit('shareUsers',users)
        socket.on('MicroButton',({micro}:{micro:boolean})=>{
            rooms[roomId][socket.id].isMicro = micro;
            io.to(roomId).emit('shareUsers',rooms[roomId])
        })
        socket.on('CameraButton',({camera}:{camera:boolean})=>{
            rooms[roomId][socket.id].isCamera = camera;
            io.to(roomId).emit('shareUsers',rooms[roomId])
        })
        socket.on("disconnect", () => {
            //console.log(`user ${rooms[roomId][socket.id].userName} left `)
            leaveRoom({roomId});
        });
        socket.on("LEAVE",leaveRoom)
    };

    const leaveRoom = ({roomId}: { roomId: string }) => {
        socket.leave((roomId))
        socket.to(roomId).emit("user-disconnected", rooms[roomId][socket.id]);
        delete rooms[roomId][socket.id];
        const users = rooms[roomId]
        Object.values(users).forEach(user => {
            io.to(user.userId).emit("REMOVE_PEER", {
                peerID: socket.id,
            });

            socket.emit("REMOVE_PEER", {
                peerID: user.userId,
            });
        })
    };
    socket.on('pressJoin', CreateUser)
    socket.on('join-room', joinRoom);

    socket.on("RELAY_SDP", ({peerID, sessionDescription}) => {
        console.log(`to ${peerID} - sessinDescript`)
        io.to(peerID).emit("SESSION_DESCRIPTION", {
            peerID: socket.id,
            sessionDescription,
        });
    });

    socket.on("RELAY_ICE", ({peerID, iceCandidate}) => {
        console.log(`to ${peerID} - relayIce`)
        io.to(peerID).emit("ICE_CANDIDATE", {
            peerID: socket.id,
            iceCandidate,
        });
    });

});


httpServer.listen(PORT, () => {
    console.log(`server is running on port - ${PORT}`)
})