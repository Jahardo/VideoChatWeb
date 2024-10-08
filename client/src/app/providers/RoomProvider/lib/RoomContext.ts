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

export type UserType = {
    roomId: string
    userId: string;
    img:string,
    userName: string;
    isMicro:boolean,
    isCamera:boolean,
};

interface RoomValue {
    clients : any[],
    provideMediaRef: (id:string, node:HTMLVideoElement)=> void,
    // peerMediaElements : MutableRefObject<Record<string, any>>
    users: Record<string, UserType>
}
export const RoomContext = createContext<RoomValue>({
    clients: [],
    provideMediaRef: null,
    users: {},
    // peerMediaElements: null,
});
