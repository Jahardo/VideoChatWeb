import { ClassNames } from 'shared/lib/ClassNames';
import { Button, ThemeButton } from 'shared/ui/Button';
import MicrophoneOn from 'shared/assets/icons/MicrophoneOn.svg';
import MicrophoneOff from 'shared/assets/icons/MicrophoneOff.svg';
import { useState } from 'react';
import cls from './MicrophoneButton.module.scss';

interface MicrophoneButtonProps {
    className?: string
}

export const MicrophoneButton = ({ className }:MicrophoneButtonProps) => {
    const [isMicro, setIsMicro] = useState(false);
    const handleButtonMicroPress = () => {
        setIsMicro((prevState) => !prevState);
    };
    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={handleButtonMicroPress}
            className={
                ClassNames(
                    cls.MicrophoneButton,
                    { [cls.MicrophoneButtonPressed]: !isMicro },
                    [className],
                )
            }
        >
            {isMicro
                ? <MicrophoneOn className={cls.iconOn} />
                : <MicrophoneOff className={cls.iconOff} />}
        </Button>
    );
};
