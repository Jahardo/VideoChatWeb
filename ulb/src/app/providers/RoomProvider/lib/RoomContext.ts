import { createContext, MutableRefObject } from 'react';

export const pcConfig = {
    iceServers: [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
            urls: 'stun:stun.l.google.com:19302',
        },
    ],
};

interface RoomValue {
    clients : any[],
    provideMediaRef: (id:string, node:HTMLVideoElement)=> void,
    // peerMediaElements : MutableRefObject<Record<string, any>>

}
export const RoomContext = createContext<RoomValue>({
    clients: [],
    provideMediaRef: null,
    // peerMediaElements: null,
});
