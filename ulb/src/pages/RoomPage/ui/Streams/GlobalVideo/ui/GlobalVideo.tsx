import { useEffect, useRef, useState } from 'react';
import cls from './GlobalVideo.module.scss';

interface Props {
    email: string;
    stream: MediaStream;
    muted?: boolean;
}

export const GlobalVideo = ({ email, stream, muted }: Props) => {
    const ref = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    useEffect(() => {
        if (ref.current) ref.current.srcObject = stream;
        if (muted) setIsMuted(muted);
    }, [stream, muted]);

    return (
        <div className={cls.Container}>
            <video className={cls.VideoContainer} ref={ref} muted={isMuted} autoPlay />
            <div
                className={cls.UserLabel}
            >
                {email}
            </div>
        </div>
    );
};
