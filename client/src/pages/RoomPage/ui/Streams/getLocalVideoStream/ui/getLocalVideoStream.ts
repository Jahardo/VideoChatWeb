import { useRef } from 'react';

export const getLocalVideoStream = async () => {
    const localMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
            width: 1280,
            height: 720,
        },
    });
    return {
        localMediaStream,
    };
};
