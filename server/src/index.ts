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
        rooms[roomId][socket.id] = {userName, roomId, userId: socket.id}
        console.log(rooms)
    }

    const joinRoom = ({roomId}: RoomTo) => {
        socket.join(roomId);
        console.log(`user - ${rooms[roomId][socket.id].userName}`);

        const users = rooms[roomId];
        Object.values(users).filter(user=>user.userId !==socket.id).forEach(user => {
            io.to(user.userId).emit("ADD_PEER", {
                peerID: socket.id,
                createOffer: false
            });

            socket.emit("ADD_PEER", {
                peerID: user.userId,
                createOffer: true,
            });
        });

        // if (!rooms[roomId]) rooms[roomId] = {};
        // console.log("user joined the room", roomId, userName);
        // rooms[roomId][socket.id] = { userName ,isMicro,isCamera};
        // socket.join(roomId);
        // socket.to(roomId).emit('')
        // socket.to(roomId).emit("user-joined", { userId:socket.id, userName });
        // socket.emit("get-users", {
        //     roomId,
        //     participants: rooms[roomId],
        // });

        socket.on("disconnect", () => {
            //console.log(`user ${rooms[roomId][socket.id].userName} left `)
            leaveRoom({roomId});
        });
        socket.on("LEAVE",leaveRoom)
    };

    const leaveRoom = ({roomId}: { roomId: string }) => {
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
        socket.to(roomId).emit("user-disconnected", socket.id);
        socket.leave((roomId))
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