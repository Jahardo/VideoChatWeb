// import { ClassNames } from 'shared/lib/ClassNames';
// import cls from 'pages/RoomPage/ui/Room.module.scss';
// import {
//     useCallback, useEffect, useRef, useState,
// } from 'react';
// import { SideScroll } from 'shared/ui/SideScroll';
// import { VideoCart } from 'features/VideoCart';
// import { socket } from 'shared/lib/socket';
// import { GlobalVideo } from 'pages/RoomPage/ui/Streams/GlobalVideo';
// import { getCameraValue, getMicroValue } from 'entities/VideoSettings';
// import { useSelector } from 'react-redux';
// import { v4 } from 'uuid';
//
// interface PanelProps {
//     className?: string
// }
//
// export type WebRTCUser = {
//     id: string;
//     email: string;
//     stream: MediaStream;
// };
//
// // eslint-disable-next-line camelcase
// export const pc_config = {
//     iceServers: [
//         // {
//         //   urls: 'stun:[STUN_IP]:[PORT]',
//         //   'credentials': '[YOR CREDENTIALS]',
//         //   'username': '[USERNAME]'
//         // },
//         {
//             urls: 'stun:stun.l.google.com:19302',
//         },
//     ],
// };
//
// const Panel = ({ className }: PanelProps) => {
//     // const [clients, setClients] = useState([]);
//     // const [isAdmin, setIsAdmin] = useState(false);
//     // const [isMain, setIsMain] = useState(true);
//     // const mainClient = 1;
//     // useEffect(() => {
//     //     socket.on('UsersInRoom', (data) => {
//     //         setClients(data.users);
//     //         console.log(data.users);
//     //     });
//     // }, []);
//     const localVideoRef = useRef<HTMLVideoElement>(null);
//     const [users, setUsers] = useState<WebRTCUser[]>([]);
//     const localStreamRef = useRef<MediaStream>();
//     const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
//
//     const isMicro = useSelector(getMicroValue);
//     const isCamera = useSelector(getCameraValue);
//
//     const getLocalStream = useCallback(async () => {
//         try {
//             const localStream = await navigator.mediaDevices.getUserMedia({
//                 audio: true,
//                 video: {
//                     width: 240,
//                     height: 240,
//                 },
//             });
//             localStreamRef.current = localStream;
//             if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
//             if (!socket) return;
//             socket.emit('join_room', {
//                 room: '1234',
//                 email: v4(),
//             });
//         } catch (e) {
//             console.log(`getUserMedia error: ${e}`);
//         }
//     }, []);
//
//     const createPeerConnection = useCallback((socketID: string, email: string) => {
//         try {
//             const pc = new RTCPeerConnection(pc_config);
//
//             pc.onicecandidate = (e) => {
//                 if (!(socket && e.candidate)) return;
//                 console.log('onicecandidate');
//                 socket.emit('candidate', {
//                     candidate: e.candidate,
//                     candidateSendID: socket.id,
//                     candidateReceiveID: socketID,
//                 });
//             };
//
//             pc.oniceconnectionstatechange = (e) => {
//                 console.log(e);
//             };
//
//             pc.ontrack = (e) => {
//                 console.log('ontrack success');
//                 /* .filter((user) => user.id !== socketID)
//                     .concat({
//                         id: socketID,
//                         email,
//                         stream: e.streams[0],
//                     }) */
//                 // .push({
//                 //         id: socketID,
//                 //         email,
//                 //         stream: e.streams[0],
//                 //     })
//                 //     prevState.filter((oldUsers) => oldUsers.id !== socketID)
//                 const newUsers = [
//                     ...users.filter((user) => user.id !== socketID),
//                     {
//                         id: socketID,
//                         email,
//                         stream: e.streams[0],
//                     },
//                 ];
//                 setUsers(newUsers);
//             };
//             if (localStreamRef.current) {
//                 console.log('localstream add');
//                 localStreamRef.current.getTracks().forEach((track) => {
//                     if (!localStreamRef.current) return;
//                     pc.addTrack(track, localStreamRef.current);
//                 });
//             } else {
//                 console.log('no local stream');
//             }
//
//             return pc;
//         } catch (e) {
//             console.error(e);
//             return undefined;
//         }
//     }, []);
//
//     useEffect(() => {
//         getLocalStream();
//
//         socket.on('all_users', (allUsers: Array<{ id: string; email: string }>) => {
//             allUsers.forEach(async (user) => {
//                 if (!localStreamRef.current) return;
//                 const pc = createPeerConnection(user.id, user.email);
//                 if (!(pc && socket)) return;
//                 pcsRef.current = { ...pcsRef.current, [user.id]: pc };
//                 try {
//                     const localSdp = await pc.createOffer({
//                         offerToReceiveAudio: true,
//                         offerToReceiveVideo: true,
//                     });
//                     console.log('create offer success');
//                     await pc.setLocalDescription(new RTCSessionDescription(localSdp));
//                     socket.emit('offer', {
//                         sdp: localSdp,
//                         offerSendID: socket.id,
//                         offerSendEmail: v4(),
//                         offerReceiveID: user.id,
//                     });
//                 } catch (e) {
//                     console.error(e);
//                 }
//             });
//         });
//
//         socket.on(
//             'getOffer',
//             async (data: {
//                 sdp: RTCSessionDescription;
//                 offerSendID: string;
//                 offerSendEmail: string;
//             }) => {
//                 const { sdp, offerSendID, offerSendEmail } = data;
//                 console.log('get offer');
//                 if (!localStreamRef.current) return;
//                 const pc = createPeerConnection(offerSendID, offerSendEmail);
//                 if (!(pc && socket)) return;
//                 pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
//                 try {
//                     await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//                     console.log('answer set remote description success');
//                     const localSdp = await pc.createAnswer({
//                         offerToReceiveVideo: true,
//                         offerToReceiveAudio: true,
//                     });
//                     await pc.setLocalDescription(new RTCSessionDescription(localSdp));
//                     socket.emit('answer', {
//                         sdp: localSdp,
//                         answerSendID: socket.id,
//                         answerReceiveID: offerSendID,
//                     });
//                 } catch (e) {
//                     console.error(e);
//                 }
//             },
//         );
//
//         socket.on(
//             'getAnswer',
//             (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
//                 const { sdp, answerSendID } = data;
//                 console.log('get answer');
//                 const pc: RTCPeerConnection = pcsRef.current[answerSendID];
//                 if (!pc) return;
//                 pc.setRemoteDescription(new RTCSessionDescription(sdp));
//             },
//         );
//
//         socket.on(
//             'getCandidate',
//             // eslint-disable-next-line no-undef
//             async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
//                 console.log('get candidate');
//                 const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
//                 if (!pc) return;
//                 await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//                 console.log('candidate add success');
//             },
//         );
//         socket.on('user_exit', (data: { id: string }) => {
//             if (!pcsRef.current[data.id]) return;
//             pcsRef.current[data.id].close();
//             delete pcsRef.current[data.id];
//             const newUsers = [
//                 ...users.filter((user) => user.id !== data.id),
//             ];
//             setUsers(newUsers);
//         });
//
//         return () => {
//             if (socket) {
//                 socket.disconnect();
//             }
//             users.forEach((user) => {
//                 if (!pcsRef.current[user.id]) return;
//                 pcsRef.current[user.id].close();
//                 delete pcsRef.current[user.id];
//             });
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [createPeerConnection, getLocalStream]);
//
//     return (
//         <div>
//             <video
//                 style={{
//                     width: 240,
//                     height: 240,
//                     margin: 5,
//                     backgroundColor: 'black',
//                 }}
//                 muted
//                 ref={localVideoRef}
//                 autoPlay
//             />
//             {users?.map((user) => (
//                 <GlobalVideo key={user.id} email={user.email} stream={user.stream} />
//             ))}
//         </div>
//     );
//     /* if (isMain) {
//         return (
//             <div className={cls.Panel}>
//                 <div className={cls.mainPanel}>
//                     {clients[mainClient]
//                         ? <VideoCart key={mainClient} className={cls.mainHeight} />
//                         : <div />}
//                 </div>
//                 <SideScroll className={cls.SideScroll}>
//                     {clients.filter((client:number) => client !== mainClient).map((client:any) => (
//                         <div
//                             key={client}
//                         >
//                             <VideoCart />
//                         </div>
//                     ))}
//                 </SideScroll>
//             </div>
//         );
//     }
//     return (
//         <div className={ClassNames(cls.grid, {}, [className])}>
//             {clients.map((client:any) => (
//                 <div>
//                     <VideoCart
//                         key={client}
//                     />
//                 </div>
//             ))}
//         </div>
//     ); */
// };
//
// export default Panel;
