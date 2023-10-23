import {
    useContext, useEffect, useRef, useState,
} from 'react';
import { RoomContext } from 'app/providers/RoomProvider';
import cls from './GlobalVideo.module.scss';

interface Props {
    muted?: boolean;
    client?:string;
}

export const GlobalVideo = ({ muted, client }: Props) => {
    const ref = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const { provideMediaRef } = useContext(RoomContext);

    // useEffect(() => {
    //     if (ref.current) ref.current.srcObject = stream;
    //     if (muted) setIsMuted(muted);
    // }, [stream, muted]);

    return (
        <div className={cls.Container}>
            <video
                className={cls.VideoContainer}
                ref={(instance) => provideMediaRef(client, instance)}
                muted={isMuted}
                autoPlay
            />
            <div
                className={cls.UserLabel}
            >
                UserName
            </div>
        </div>
    );
};
