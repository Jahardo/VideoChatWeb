import {Server} from 'socket.io'

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

export class Socket{
    io:Server;
    rooms: Record<string, Record<string, IUser>> = {};
    constructor(socket:Server){
        this.io= socket
    }
    
    socketEvents(){
        this.io.on('connection', (socket) => {
            console.log(`connected socket ${socket.id}`);

            const createUser = ({ roomId, userName }: IUser) => {
                if (!this.rooms[roomId]) {
                    this.rooms[roomId] = {};
                }
                this.rooms[roomId][socket.id] = { userName, roomId, userId: socket.id, isMicro: true, isCamera: true };
                console.log(this.rooms);
            };

            const joinRoom = ({ roomId }: RoomTo) => {
                console.log(`user - ${this.rooms[roomId][socket.id].userName}`);

                const users = this.rooms[roomId];
                Object.values(users).filter(user => user.userId !== socket.id).forEach(user => {
                    this.io.to(user.userId).emit("ADD_PEER", {
                        peerID: socket.id,
                        createOffer: false,
                    });

                    socket.emit("ADD_PEER", {
                        peerID: user.userId,
                        createOffer: true,
                    });
                });
                Object.values(users).filter(user => user.userId !== socket.id).forEach(user => {
                    this.io.to(roomId).emit("user-joined", this.rooms[socket.id]);
                });

                socket.join(roomId);
                this.io.to(roomId).emit('shareUsers', users);
                socket.on('MicroButton', ({ micro }: { micro: boolean }) => {
                    this.rooms[roomId][socket.id].isMicro = micro;
                    this.io.to(roomId).emit('shareUsers', this.rooms[roomId]);
                });
                socket.on('CameraButton', ({ camera }: { camera: boolean }) => {
                    this.rooms[roomId][socket.id].isCamera = camera;
                    this.io.to(roomId).emit('shareUsers', this.rooms[roomId]);
                });
                socket.on("disconnect", () => {
                    //console.log(`user ${this.rooms[roomId][socket.id].userName} left `)
                    leaveRoom({ roomId });
                });
                socket.on("LEAVE", leaveRoom);
            };

            const leaveRoom = ({ roomId }: { roomId: string }) => {
                socket.leave(roomId);
                this.io.to(roomId).emit("user-disconnected", this.rooms[roomId][socket.id]);
                delete this.rooms[roomId][socket.id];
                const users = this.rooms[roomId];
                Object.values(users).forEach(user => {
                    this.io.to(user.userId).emit("REMOVE_PEER", {
                        peerID: socket.id,
                    });

                    socket.emit("REMOVE_PEER", {
                        peerID: user.userId,
                    });
                });
            };

            socket.on('pressJoin', createUser);
            socket.on('join-room', joinRoom);

            socket.on("RELAY_SDP", ({ peerID, sessionDescription }) => {
                console.log(`to ${peerID} - sessinDescript`);
                this.io.to(peerID).emit("SESSION_DESCRIPTION", {
                    peerID: socket.id,
                    sessionDescription,
                });
            });

            socket.on("RELAY_ICE", ({ peerID, iceCandidate }) => {
                console.log(`to ${peerID} - relayIce`);
                this.io.to(peerID).emit("ICE_CANDIDATE", {
                    peerID: socket.id,
                    iceCandidate,
                });
            });
        });
    }
}
