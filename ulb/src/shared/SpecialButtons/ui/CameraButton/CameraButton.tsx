import { ClassNames } from 'shared/lib/ClassNames';
import React, { useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button';
import VideoCamera from 'shared/assets/icons/VideoCamera.svg';
import VideoCameraSlash from 'shared/assets/icons/VideoCameraSlash.svg';
import cls from './CameraButton.module.scss';

interface CameraButtonProps {
    className?: string
}

export const CameraButton = ({ className }:CameraButtonProps) => {
    const [isCamera, setIsCamera] = useState(false);
    const handleButtonCameraPress = () => {
        setIsCamera((prevState) => !prevState);
    };
    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={handleButtonCameraPress}
            className={ClassNames(cls.CameraButton, { [cls.CameraButtonPressed]: !isCamera }, [className])}
        >
            {isCamera
                ? <VideoCamera className={cls.iconOn} />
                : <VideoCameraSlash className={cls.iconOff} />}
        </Button>
    );
};
