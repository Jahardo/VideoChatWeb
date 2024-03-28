import React, { useEffect, useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames';
import { socket } from 'shared/lib/socket';
import { UserType } from 'app/providers/RoomProvider/lib/RoomContext';
import { useTranslation } from 'react-i18next';
import cls from './NotificationCart.module.scss';

interface NotificationCartProps {
    ClassName?: string,
}
export const NotificationCart = ({ ClassName }:NotificationCartProps) => {
    const [notification, setNotification] = useState<string>();
    const [isActive, setActive] = useState<boolean>(false);
    const t = useTranslation();

    useEffect(() => {
        socket.on('user-joined', (user:UserType) => {
            setNotification(`${user.userName} has joined to room`);
            setActive(true);
            setTimeout(() => {
                setActive(false);
            }, 5000);
        });
        socket.on('user-disconnected', (user) => {
            setNotification(`${user.userName} has left the room`);
            setActive(true);
            setTimeout(() => {
                setActive(false);
            }, 5000);
        });
    }, []);
    if (!isActive) return null;
    return (
        <div className={ClassNames(cls.NotificationCart, {}, [ClassName])}>
            {notification}
        </div>
    );
};
