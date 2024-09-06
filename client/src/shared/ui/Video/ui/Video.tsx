import { ClassNames } from 'shared/lib/ClassNames';
import {
    MutableRefObject,
    useCallback, useContext, useEffect, useRef, useState, VideoHTMLAttributes,
} from 'react';
import { getLocalVideoStream } from 'pages/RoomPage/ui/Streams/getLocalVideoStream';
import { socket } from 'shared/lib/socket';
import { useSelector } from 'react-redux';
import { getCameraValue, getMicroValue, VideoSettingsActions } from 'entities/VideoSettings';
import { RoomContext } from 'app/providers/RoomProvider';
import { CameraButton } from 'shared/SpecialButtons';
import { getVideoSettings } from 'entities/VideoSettings/model/selectors/getVideoSettings/getVideoSettings';
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

    const ref = useRef<HTMLVideoElement>(null);
    const isCamera = useSelector(getCameraValue);
    const { provideMediaRef } = useContext(RoomContext);
    const localMediaStreamRef = useRef<MediaStream>(null);
    useEffect(() => {
        const getRef = async () => {
            getLocalVideoStream().then((res) => {
                localMediaStreamRef.current = res.localMediaStream;
                if (ref.current) ref.current.srcObject = localMediaStreamRef.current;
            });
        };
        getRef();
    }, []);
    useEffect(() => {
        if (localMediaStreamRef.current) {
            if (!isCamera) {
                localMediaStreamRef.current.getTracks().filter((track) => track.kind === 'video').forEach((track) => track.enabled = false);
            } else {
                localMediaStreamRef.current.getTracks().filter((track) => track.kind === 'video').forEach((track) => track.enabled = true);
            }
        }
    }, [isCamera]);
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
