import { ClassNames } from 'shared/lib/ClassNames';
import React, { FC, InputHTMLAttributes } from 'react';
import cls from './ToggleSwitcher.module.scss';

interface ToggleSwitcherProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export const ToggleSwitcher:FC<any> = (props:ToggleSwitcherProps) => {
    const {
        className,
        ...otherProps
    } = props;
    return (
        <div className={ClassNames(cls.ToggleSwitcher, {}, [className])}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
                <input
                    type="checkbox"
                    {...otherProps}
                />
                <span className={cls.Halo} />
            </label>
        </div>
    );
};
