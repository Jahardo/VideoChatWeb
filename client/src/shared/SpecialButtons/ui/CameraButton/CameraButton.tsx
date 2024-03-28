import { ClassNames } from 'shared/lib/ClassNames';
import { Button, ThemeButton } from 'shared/ui/Button';
import VideoCamera from 'shared/assets/icons/VideoCamera.svg';
import VideoCameraSlash from 'shared/assets/icons/VideoCameraSlash.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCameraValue, VideoSettingsActions } from 'entities/VideoSettings';
import cls from './CameraButton.module.scss';

interface CameraButtonProps {
    className?: string
}

export const CameraButton = ({ className }:CameraButtonProps) => {
    const dispatch = useDispatch();
    const isCamera = useSelector(getCameraValue);
    const handleButtonCameraPress = () => {
        dispatch(VideoSettingsActions.turnCamera());
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
