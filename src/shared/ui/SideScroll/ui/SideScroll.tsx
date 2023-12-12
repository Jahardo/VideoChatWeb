import { ClassNames } from 'shared/lib/ClassNames';
import { FC, ReactNode } from 'react';
import cls from './SideScroll.module.scss';

interface SideScrollProps{
    className?: string
    children?: ReactNode

}

export const SideScroll: FC<SideScrollProps> = (props) => {
    const {
        className,
        children,
    } = props;
    return (
        <div className={ClassNames(cls.SideScroll, {}, [className])}>
            {children}
        </div>
    );
};
