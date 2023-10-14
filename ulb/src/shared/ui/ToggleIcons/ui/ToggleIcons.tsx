import { ClassNames } from 'shared/lib/ClassNames';
import React, {
    FC, InputHTMLAttributes,
} from 'react';
import cls from './ToggleIcons.module.scss';

interface ToggleIconsProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string
}

export const ToggleIcons:FC<any> = (props:ToggleIconsProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props;
    return (
        <div className={ClassNames(cls.ToggleIcons, {}, [className])}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
                <input
                    type="checkbox"
                    {...otherProps}
                />
                <div className={cls.icon}>
                    <div className={cls.iconRotation}>
                        {children}
                    </div>
                </div>
            </label>
        </div>
    );
};
