import { ClassNames } from 'shared/lib/ClassNames';
import { useState } from 'react';
import { LocalVideo } from 'shared/ui/Video';
import { CameraButton, MicrophoneButton } from 'shared/SpecialButtons';
import cls from './PreEnterVideoElement.module.scss';

interface PreEnterVideoElementProps {
    className?: string
}

export const PreEnterVideoElement = ({ className }:PreEnterVideoElementProps) => {
    const [isCamera, setIsCamera] = useState(false);
    const [isMicro, setIsMicro] = useState(false);
    const handleButtonMicroPress = () => {
        setIsMicro((prevState) => !prevState);
    };

    const handleButtonCameraPress = () => {
        setIsCamera((prevState) => !prevState);
    };
    const LOCAL_MEDIA = 'localMedia';
    return (
        <div className={ClassNames(cls.PreEnterVideoElement, {}, [className])}>
            <LocalVideo className={cls.Video} />
            <div className={cls.btnPositions}>
                <CameraButton />
                <MicrophoneButton />
            </div>
        </div>
    );
};
