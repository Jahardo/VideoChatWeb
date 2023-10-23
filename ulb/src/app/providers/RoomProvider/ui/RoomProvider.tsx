import React, {
    ReactNode, useCallback, useEffect, useRef,
} from 'react';
import { useStateCallback } from 'pages/RoomPage/ui/hooks/useStateCallback';
import { useParams } from 'react-router-dom';
import { socket } from 'shared/lib/socket';
import * as freeice from 'freeice';
import { pcConfig, RoomContext } from '../lib/RoomContext';

interface RoomProviderProps {
    children:ReactNode,
}

export type WebRTCUser = {
    userId: string;
    userName: string;
    stream: MediaStream;
};

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export const RoomProvider = ({ children }:RoomProviderProps) => {
    const [clients, updateClients] = useStateCallback<string[]>([]);
    const roomId = useParams();

    const addNewClient = useCallback((newClient:any, cb:any) => {
        if (!clients.includes(newClient)) {
            // @ts-ignore
            updateClients((prev) => [...prev, newClient], cb);
        } else cb();
        // const cl = () => {
        //     if (!clients.includes(newClient)) {
        //         return [...clients, newClient];
        //     }
        //     return clients;
        // };

        // console.log(clients);
    }, [clients, updateClients]);

    const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
    const localMediaStream = useRef(null);
    const peerMediaElements = useRef<Record<string, any>>({
        [LOCAL_VIDEO]: null,
    });
    const startCapture = useCallback(async () => {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 1280,
                height: 720,
            },
        });
        addNewClient(LOCAL_VIDEO, () => {
            const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

            if (localVideoElement) {
                localVideoElement.volume = 0;
                localVideoElement.srcObject = localMediaStream.current;
            }
        });
        console.log(clients);
    }, []);
    useEffect(() => {
        startCapture()
            .then(() => socket.emit('join-room', { roomId: roomId.id }))
            .catch((e) => console.error('Error getting userMedia:', e));
        return () => {
            // localMediaStream.current.getTracks().forEach((track) => track.stop());

            socket.emit('LEAVE', { roomId: roomId.id });
        };
    }, [roomId.id]);

    useEffect(() => {
        const handleNewPeer = async ({ peerID, createOffer }:{peerID:string, createOffer:boolean}) => {
            if (peerID in peerConnections.current) {
                console.warn(`Already connected to peer ${peerID}`);
            }
            // peerConnections.current[peerID] = new RTCPeerConnection(pcConfig);
            peerConnections.current[peerID] = new RTCPeerConnection({
                iceServers: freeice(),
            });
            peerConnections.current[peerID].onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('RELAY_ICE', {
                        peerID,
                        iceCandidate: event.candidate,
                    });
                }
            };

            let tracksNumber = 0;
            peerConnections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
                tracksNumber += 1;

                if (tracksNumber === 2) { // video & audio tracks received
                    tracksNumber = 0;
                    addNewClient(peerID, () => {
                        if (peerMediaElements.current[peerID]) {
                            peerMediaElements.current[peerID].srcObject = remoteStream;
                            console.log(clients);
                        } else {
                            // FIX LONG RENDER IN CASE OF MANY CLIENTS
                            let settled = false;
                            const interval = setInterval(() => {
                                if (peerMediaElements.current[peerID]) {
                                    settled = true;
                                }

                                if (settled) {
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }
                    });
                }
            };

            localMediaStream.current.getTracks().forEach((track:MediaStreamTrack) => {
                peerConnections.current[peerID].addTrack(track, localMediaStream.current);
            });

            if (createOffer) {
                const offer = await peerConnections.current[peerID].createOffer();

                await peerConnections.current[peerID].setLocalDescription(offer);

                socket.emit('RELAY_SDP', {
                    peerID,
                    sessionDescription: offer,
                });
            }
        };
        socket.on('ADD_PEER', handleNewPeer);
        return () => {
            socket.off('ADD_PEER');
        };
    }, []);

    useEffect(() => {
        async function setRemoteMedia(
            { peerID, sessionDescription: remoteDescription }: {peerID:string, sessionDescription:any},
        ) {
            await peerConnections.current[peerID]?.setRemoteDescription(
                new RTCSessionDescription(remoteDescription),
            );

            if (remoteDescription.type === 'offer') {
                const answer = await peerConnections.current[peerID].createAnswer();

                await peerConnections.current[peerID].setLocalDescription(answer);

                socket.emit('RELAY_SDP', {
                    peerID,
                    sessionDescription: answer,
                });
            }
        }

        socket.on('SESSION_DESCRIPTION', setRemoteMedia);

        return () => {
            socket.off('SESSION_DESCRIPTION');
        };
    }, []);

    useEffect(() => {
        socket.on('ICE_CANDIDATE', ({ peerID, iceCandidate }:{peerID:string, iceCandidate:any}) => {
            peerConnections.current[peerID]?.addIceCandidate(
                new RTCIceCandidate(iceCandidate),
            );
        });

        return () => {
            socket.off('ICE_CANDIDATE');
        };
    }, []);

    useEffect(() => {
        const handleRemovePeer = ({ peerID }:{peerID:string}) => {
            if (peerConnections.current[peerID]) {
                peerConnections.current[peerID].close();
            }

            delete peerConnections.current[peerID];
            delete peerMediaElements.current[peerID];
            // @ts-ignore
            updateClients((prev) => prev.filter((c) => c !== peerID));
        };

        socket.on('REMOVE_PEER', handleRemovePeer);

        return () => {
            socket.off('REMOVE_PEER');
        };
    }, []);

    const provideMediaRef = useCallback((id:string, node:any) => {
        peerMediaElements.current[id] = node;
    }, []);

    return (
        <RoomContext.Provider
            value={{
                clients,
                provideMediaRef,
            }}
        >
            {children}
            {/* { */}
            {/*    JSON.stringify(`${clients}424`) */}
            {/* } */}
        </RoomContext.Provider>
    );
};
