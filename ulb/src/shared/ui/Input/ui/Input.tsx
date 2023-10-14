import { ClassNames } from 'shared/lib/ClassNames';
import { InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

export enum InputTheme {
    CLEAR = 'clear',

    SMALL = 'smallInput'

}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    theme?: InputTheme,
}

export const Input = (props:InputProps) => {
    const {
        className,
        theme,
        ...otherProps
    } = props;
    return (
        <input
            className={ClassNames(cls.Input, {}, [cls[theme], className])}
            {...otherProps}
        />

    );
};
