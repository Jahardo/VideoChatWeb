import { ClassNames } from 'shared/lib/ClassNames';
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY= 'primary',
    SECONDARY = 'secondary',

}
interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

export const AppLink:FC<AppLinkProps> = (props:AppLinkProps) => {
    const
        {
            to,
            children,
            className,
            theme = AppLinkTheme.PRIMARY,
            ...OtherProps
        } = props;
    return (
        <Link
            to={to}
            className={ClassNames(cls.AppLink, {}, [className, cls[theme]])}
            {...OtherProps}
        >
            {children}
        </Link>
    );
};
