import { ClassNames } from 'shared/lib/ClassNames';
import CameraBlack from 'shared/assets/icons/CameraBlack.svg';
import cls from './AvatarChange.module.scss';

interface AvatarChangeProps {
    className?: string;
    imgUrl:string;
    showModal:()=>void;
}

export const AvatarChange = ({ className, imgUrl, showModal }:AvatarChangeProps) => {
    const t = 'tt';
    return (
        <div onClick={showModal} className={ClassNames(cls.AvatarChange, {}, [className])}>
            <div className={cls.img_change} />
            <img className={cls.img__edit} src={imgUrl} alt="" />
            <CameraBlack className={cls.edit__camera} />
        </div>
    );
};
