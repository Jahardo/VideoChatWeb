import { ClassNames } from 'shared/lib/ClassNames';
import { useState, VideoHTMLAttributes } from 'react';
import { LocalVideo } from 'shared/ui/Video';
import { useTranslation } from 'react-i18next';
import cls from './VideoCart.module.scss';

interface VideoCartProps extends VideoHTMLAttributes<HTMLVideoElement>{
    className?: string
}

export const VideoCart = ({ className, ...otherProps }:VideoCartProps) => {
    const [isCamera, setIsCamera] = useState(false);
    const { t } = useTranslation('room');
    return (
        <div className={ClassNames(cls.VideoCart, { [cls.cameraOff]: !isCamera }, [className])}>
            {isCamera
                ? <LocalVideo {...otherProps} />
                : (
                    <img
                        className={cls.img}
                        /* eslint-disable-next-line max-len */
                        src="https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1571324860479-8VDUGJTYKN5D2YXW7ZC5/image-asset.jpeg"
                        alt="fv"
                    />
                )}
            <div className={cls.name}>{t('User Name')}</div>
        </div>
    );
};
