/*
import {
    useCallback, useEffect, useRef, useState,
} from 'react';
import { getLocalVideoStream } from 'pages/RoomPage/ui/Streams/getLocalVideoStream';
import { ACTIONS, socket } from 'shared/lib/socket';
import { useStateCallback } from 'pages/RoomPage/ui/hooks/useStateCallback';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export const useWebRTC = (roomId:string) => {
    const [clients, updateClients] = useStateCallback([]);

    const addNewClient = useCallback((newClient:string, cb) => {
        if(!clients.includes(newClient)){
            updateClients((list) => [...list,newClient]);
        }, cb);
    }, [clients, updateClients]);

    const peerConnections = useRef({});
    const localMediaStream = useRef(null);
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null,
    });
};
*/
