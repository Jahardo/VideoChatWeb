import { ClassNames } from 'shared/lib/ClassNames';
import {
    useContext, useEffect, useState, VideoHTMLAttributes,
} from 'react';
import { useTranslation } from 'react-i18next';
import { RoomContext } from 'app/providers/RoomProvider';
import { socket } from 'shared/lib/socket';
import MicrophoneOn from 'shared/assets/icons/MicrophoneOn.svg';
import MicrophoneOff from 'shared/assets/icons/MicrophoneOff.svg';
import cls from './VideoCart.module.scss';

interface VideoCartProps extends VideoHTMLAttributes<HTMLVideoElement> {
    className?: string
    client?: string
}

export const VideoCart = ({
    className, client, ...otherProps
}: VideoCartProps) => {
    const { t } = useTranslation('room');
    const { provideMediaRef, users } = useContext(RoomContext);
    return (
        <div className={ClassNames(cls.VideoCart, {}, [className])}>
            <video
                className={ClassNames('', { [cls.HideVideo]: !users[client]?.isCamera }, [])}
                ref={(instance) => provideMediaRef(client, instance)}
                width="100%"
                height="100%"
                autoPlay
                playsInline
                muted={!users[client].isMicro}
            />
            <img
                className={ClassNames(cls.img, { [cls.HideVideo]: users[client]?.isCamera }, [])}
                /* eslint-disable-next-line max-len */
                src="https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1571324860479-8VDUGJTYKN5D2YXW7ZC5/image-asset.jpeg"
            />
            <div className={cls.microIcon}>
                {users[client]?.isMicro
                    ? <MicrophoneOn />
                    : <MicrophoneOff />}

            </div>
            <div className={cls.name}>
                {
                    JSON.stringify(users[client]?.isCamera)
                }
                {t('User Name')}
                {' '}
                {client === socket.id
                    ? (
                        <div>
                            you -
                            {users[client]?.userName}
                        </div>
                    )
                    : <div>{users[client]?.userName}</div>}

            </div>
        </div>
    );
};
