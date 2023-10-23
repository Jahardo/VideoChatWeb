import { ClassNames } from 'shared/lib/ClassNames';
import { useContext, useState, VideoHTMLAttributes } from 'react';
import { LocalVideo } from 'shared/ui/Video';
import { useTranslation } from 'react-i18next';
import { GlobalVideo } from 'pages/RoomPage/ui/Streams/GlobalVideo';
import { RoomContext } from 'app/providers/RoomProvider';
import { Video } from 'shared/ui/Video/ui/Video';
import cls from './VideoCart.module.scss';

interface VideoCartProps extends VideoHTMLAttributes<HTMLVideoElement>{
    className?: string
    client?:string
}

export const VideoCart = ({
    className, client, ...otherProps
}:VideoCartProps) => {
    const [isCamera, setIsCamera] = useState(true);
    const { t } = useTranslation('room');
    const { provideMediaRef } = useContext(RoomContext);
    return (
        <div className={ClassNames(cls.VideoCart, { /* [cls.cameraOff]: !isCamera */ }, [className])}>
            {isCamera
                ? (
                    <video
                        ref={(instance) => provideMediaRef(client, instance)}
                        width="100%"
                        height="100%"
                        autoPlay
                        playsInline
                        muted
                    />
                ) /* <GlobalVideo muted={client === 'LOCAL_VIDEO'} client={client} /> */
                : (
                    <img
                        className={cls.img}
                        /* eslint-disable-next-line max-len */
                        src="https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1571324860479-8VDUGJTYKN5D2YXW7ZC5/image-asset.jpeg"
                        alt="fv"
                    />
                )}
            <div className={cls.name}>
                {t('User Name')}
                {' '}
                {client}
            </div>
        </div>
    );
};
