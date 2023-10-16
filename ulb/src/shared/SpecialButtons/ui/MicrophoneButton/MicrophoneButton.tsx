import { ClassNames } from 'shared/lib/ClassNames';
import { Button, ThemeButton } from 'shared/ui/Button';
import MicrophoneOn from 'shared/assets/icons/MicrophoneOn.svg';
import MicrophoneOff from 'shared/assets/icons/MicrophoneOff.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getMicroValue, VideoSettingsActions } from 'entities/VideoSettings';
import cls from './MicrophoneButton.module.scss';

interface MicrophoneButtonProps {
    className?: string
}

export const MicrophoneButton = ({ className }:MicrophoneButtonProps) => {
    const dispatch = useDispatch();
    const isMicro = useSelector(getMicroValue);
    const handleButtonMicroPress = () => {
        dispatch(VideoSettingsActions.turnMicro());
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
