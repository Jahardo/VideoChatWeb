import { ClassNames } from 'shared/lib/ClassNames';
import {
    useCallback, useEffect, useRef, VideoHTMLAttributes,
} from 'react';
import { getLocalVideoStream } from 'pages/RoomPage/ui/Streams/getLocalVideoStream';
import { socket } from 'shared/lib/socket';
import { useSelector } from 'react-redux';
import { getCameraValue, getMicroValue } from 'entities/VideoSettings';
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
    const isCamera = useSelector(getCameraValue);
    const isMicro = useSelector(getMicroValue);
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null,
    });

    const MakeLocal = async () => {
        const { localMediaStream } = await getLocalVideo;
        function hideCam() {
            const videoTrack = localMediaStream.current.getTracks().find(
                (track:MediaStreamTrack) => track.kind === 'video',
            );
            videoTrack.enabled = false;
        }
        function OffMicro() {
            const videoTrack = localMediaStream.current.getAudioTracks().find(
                (track:MediaStreamTrack) => track.kind === 'audio',
            );
            videoTrack.enabled = false;
        }
        function OnMicro() {
            const videoTrack = localMediaStream.current.getAudioTracks().find(
                (track:MediaStreamTrack) => track.kind === 'audio',
            );
            videoTrack.enabled = true;
        }

        function showCam() {
            const videoTrack = localMediaStream.current.getTracks().find(
                (track:MediaStreamTrack) => track.kind === 'video',
            );
            videoTrack.enabled = true;
        }
        const stream = peerMediaElements.current[LOCAL_VIDEO];
        if (stream) {
            // stream.volume = 0;
            stream.srcObject = localMediaStream.current;
        }
        if (isCamera) {
            showCam();
        }
        if (!isCamera) {
            hideCam();
        }
        if (isMicro) {
            OnMicro();
        }
        if (!isMicro) {
            OffMicro();
        }
    };
    useEffect(() => {
        MakeLocal();
    }, [isMicro, isCamera]);
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
