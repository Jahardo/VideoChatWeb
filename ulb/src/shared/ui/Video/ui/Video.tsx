import { ClassNames } from 'shared/lib/ClassNames';
import {
    useCallback, useContext, useEffect, useRef, useState, VideoHTMLAttributes,
} from 'react';
import { getLocalVideoStream } from 'pages/RoomPage/ui/Streams/getLocalVideoStream';
import { socket } from 'shared/lib/socket';
import { useSelector } from 'react-redux';
import { getCameraValue, getMicroValue } from 'entities/VideoSettings';
import { RoomContext } from 'app/providers/RoomProvider';
import cls from './Video.module.scss';

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement>{
    className?: string
    muted?:boolean
}

export const Video = (props:VideoProps) => {
    const {
        className,
        muted,
        ...otherProps
    } = props;
    const getVideo = getLocalVideoStream();
    const ref = useRef<HTMLVideoElement>(null);
    const { provideMediaRef } = useContext(RoomContext);
    useEffect(() => {
        const getRef = async () => {
            const { localMediaStream } = await getVideo;
            if (ref.current) ref.current.srcObject = localMediaStream.current;
            return localMediaStream;
        };
        getRef();
    }, []);
    return (
        <video
            ref={ref}
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
