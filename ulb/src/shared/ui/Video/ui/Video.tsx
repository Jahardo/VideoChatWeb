import { ClassNames } from 'shared/lib/ClassNames';
import {
    useCallback, useEffect, useRef, VideoHTMLAttributes,
} from 'react';
import { getLocalVideoStream } from 'pages/RoomPage/ui/Streams/getLocalVideoStream';
import { socket } from 'shared/lib/socket';
import cls from './Video.module.scss';

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement>{
    className?: string
    nodes ?: string
}

export const Video = (props:VideoProps) => {
    const {
        nodes,
        className,
        ...otherProps
    } = props;
    const getLocalVideo = getLocalVideoStream();
    const LOCAL_VIDEO = nodes;
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null,
    });

    const MakeLocal = async () => {
        const { localMediaStream } = await getLocalVideo;
        // localMediaStream.current = await navigator.mediaDevices.getUserMedia(
        //     {
        //         audio: true,
        //         video: {
        //             width: 1280,
        //             height: 720,
        //             // deviceId: 'YJRASEO0uC3PjzRqXfOKeAJDySJePCdirttWqoXcNDI=',
        //             // deviceId: 'kjyINpz6+OxsYEifeZGXqrivMNu3/GluIOdv7CgmG6M=',
        //         },
        //     },
        // );
        const stream = peerMediaElements.current[LOCAL_VIDEO];
        if (stream) {
            stream.volume = 0;
            stream.srcObject = localMediaStream.current;
        }
    };
    useEffect(() => {
        MakeLocal();
    }, []);
    const getRef = useCallback(async (node:any) => {
        peerMediaElements.current[LOCAL_VIDEO] = node;
    }, []);
    return (
        <video
            ref={(instance) => getRef(instance)}
            width="100%"
            height="100%"
            autoPlay
            playsInline
            muted
            className={ClassNames(cls.Video, {}, [className])}
            {...otherProps}
        />
    );
};
