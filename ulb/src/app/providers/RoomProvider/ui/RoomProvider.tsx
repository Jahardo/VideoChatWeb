import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useStateCallback } from 'pages/RoomPage/ui/hooks/useStateCallback';
import { useParams } from 'react-router-dom';
import { socket } from 'shared/lib/socket';
import * as freeice from 'freeice';
import { useSelector } from 'react-redux';
import { getCameraValue, getMicroValue } from 'entities/VideoSettings';
import { pcConfig, RoomContext, UserType } from '../lib/RoomContext';

interface RoomProviderProps {
    children:ReactNode,
}

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export const RoomProvider = ({ children }:RoomProviderProps) => {
    const [clients, updateClients] = useStateCallback<string[]>([]);
    const roomId = useParams();
    const isCamera = useSelector(getCameraValue);
    const isMicro = useSelector(getMicroValue);

    const addNewClient = useCallback((newClient:string, cb:any) => {
        // @ts-ignore
        updateClients((list) => {
            if (!list.includes(newClient)) {
                return [...list, newClient];
            }

            return list;
        }, cb);
    }, [clients, updateClients]);

    const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
    const localMediaStream = useRef(null);
    const peerMediaElements = useRef<Record<string, any>>({
        [socket.id]: null,
    });
    const [users, setUsers] = useState<Record<string, UserType>>({});

    useEffect(() => {
        socket.on('shareUsers', (users) => {
            setUsers(users);
            console.log(users);
        });
    }, []);

    const startCapture = async () => {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 1280,
                height: 720,
            },
        });
        addNewClient(socket.id, () => {
            const localVideoElement = peerMediaElements.current[socket.id];

            if (localVideoElement) {
                localVideoElement.volume = 0;
                localVideoElement.srcObject = localMediaStream.current;
            }
        });
    };
    useEffect(() => {
        startCapture()
            .then(() => socket.emit('join-room', { roomId: roomId.id }))
            .catch((e) => console.error('Error getting userMedia:', e));
        return () => {
            localMediaStream.current.getTracks().forEach((track:MediaStreamTrack) => track.stop());
            socket.emit('LEAVE', { roomId: roomId.id });
        };
    }, [roomId.id]);

    useEffect(() => {
        const handleNewPeer = async ({ peerID, createOffer }:{peerID:string, createOffer:boolean}) => {
            if (peerID in peerConnections.current) {
                console.log(`Already connected to peer ${peerID}`);
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

            if (localMediaStream.current) {
                localMediaStream.current.getTracks().forEach((track:MediaStreamTrack) => {
                    peerConnections.current[peerID].addTrack(track, localMediaStream.current);
                });
            }

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

    useEffect(() => {
        if (!localMediaStream.current) return;
        if (isCamera) {
            const videoTrack = localMediaStream.current
                .getTracks()
                .find((track:MediaStreamTrack) => track.kind === 'video');
            videoTrack.enabled = true;
            socket.emit('CameraButton', { camera: isCamera });
        }
        if (!isCamera) {
            const videoTrack = localMediaStream.current
                .getTracks()
                .find((track:MediaStreamTrack) => track.kind === 'video');
            videoTrack.enabled = false;
            socket.emit('CameraButton', { camera: isCamera });
        }
    }, [isCamera]);

    useEffect(() => {
        if (!localMediaStream.current) return;
        if (isMicro) {
            const videoTrack = localMediaStream.current
                .getTracks()
                .find((track:MediaStreamTrack) => track.kind === 'audio');
            videoTrack.enabled = true;
            socket.emit('MicroButton', { micro: isMicro });
        }
        if (!isMicro) {
            const videoTrack = localMediaStream.current
                .getTracks()
                .find((track:MediaStreamTrack) => track.kind === 'audio');
            videoTrack.enabled = false;
            socket.emit('MicroButton', { micro: isMicro });
        }
    }, [isMicro]);

    const provideMediaRef = useCallback((id:string, node:any) => {
        peerMediaElements.current[id] = node;
    }, []);

    return (
        <RoomContext.Provider
            value={{
                clients,
                provideMediaRef,
                users,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};
