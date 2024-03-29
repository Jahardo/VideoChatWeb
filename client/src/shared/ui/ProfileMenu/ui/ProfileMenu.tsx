import React, {
    ReactComponentElement, Ref, RefObject, useEffect, useRef, useState,
} from 'react';
import { ClassNames } from 'shared/lib/ClassNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import cls from './ProfileMenu.module.scss';

interface ProfileMenuPros {
    className?:string
    opened:boolean,
    handleClick?: ()=> void;
    profRef?:RefObject<any>;
}
export const ProfileMenu = ({
    className, opened, handleClick, profRef,
}:ProfileMenuPros) => {
    const { t } = useTranslation();
    const buttonRef = useRef<any>(null);
    const [click, setClick] = useState<boolean>(false);
    useEffect(() => {
        const tt = () => {
            buttonRef.current.classList.add(cls.effectContainer);
        };
        tt();
        const applyStyles = (e:MouseEvent) => {
            const { offsetX, offsetY } = e;
            const { style } = buttonRef.current;
            style.setProperty('--effect-duration', `${2.25}s`);
            style.setProperty('--effect-left', `${offsetX - (buttonRef.current.offsetWidth / 2)}px`);
            style.setProperty('--effect-top', `${offsetY - (buttonRef.current.offsetHeight / 2)}px`);
            style.setProperty('--effect-width', `${buttonRef.current.offsetWidth}px`);
            style.setProperty('--effect-height', `${buttonRef.current.offsetHeight}px`);
        };
        const buttonClick = (e:MouseEvent) => {
            buttonRef.current.classList.remove(cls.active);
            applyStyles(e);
            buttonRef.current.classList.add(cls.active);
        };
        buttonRef.current.addEventListener('mouseup', buttonClick);
    }, []);
    return (
        <div
            ref={profRef}
            className={ClassNames(cls.ProfileMenu, {}, [className])}
        >
            <div
                // className={ClassNames(cls.effectContainer, {}, [click ? cls.active : cls['']])}
                ref={buttonRef}
            >
                <Button
                    theme={ThemeButton.SUBMIT}
                    className={cls.btn}
                    onClick={handleClick}
                >
                    {t('Profile')}
                </Button>
            </div>
            <div
                className={ClassNames(cls.Links__group, {}, [opened ? cls[''] : cls.Links__display])}
            >
                <AppLink to="/about" className={cls.appLink}>
                    {t('Log in')}
                </AppLink>
                <AppLink to="/" className={cls.appLink}>
                    {t('Log in')}
                </AppLink>
                <AppLink to="/" className={cls.appLink}>
                    {t('Log in')}
                </AppLink>
                <AppLink to="/" className={cls.appLink}>
                    {t('Log in')}
                </AppLink>
            </div>

        </div>
    );
};
