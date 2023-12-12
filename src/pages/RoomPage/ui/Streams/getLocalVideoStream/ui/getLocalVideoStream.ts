import { useRef } from 'react';

export const getLocalVideoStream = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const localMediaStream = useRef(null);
    localMediaStream.current = await navigator.mediaDevices.getUserMedia({
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
