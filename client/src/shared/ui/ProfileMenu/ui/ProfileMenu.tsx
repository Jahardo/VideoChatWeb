import React, {
    ReactComponentElement, Ref, RefObject, useEffect, useRef, useState,
} from 'react';
import { ClassNames } from 'shared/lib/ClassNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { ClickingAnimation } from 'shared/ui/ClickingAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthValue, getUser, UserActions } from 'entities/User';
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
    const isLogin = useSelector(getAuthValue);
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(UserActions.logoutUser());
    };

    return (
        <div
            ref={profRef}
            className={ClassNames(cls.ProfileMenu, {}, [className])}
        >
            <ClickingAnimation objRef={buttonRef}>
                <Button
                    theme={ThemeButton.SUBMIT}
                    className={cls.btn}
                    onClick={handleClick}
                >
                    {t('Profile')}
                </Button>
            </ClickingAnimation>
            {isLogin
                ? (
                    <div
                        className={ClassNames(cls.Links__group, {}, [opened ? cls[''] : cls.Links__display])}
                    >
                        <AppLink to="/edit" className={cls.appLink}>
                            {t('Edit')}
                        </AppLink>
                        <AppLink to="/" className={cls.appLink} onClick={logOut}>
                            {t('Log out')}
                        </AppLink>
                    </div>
                )
                : (
                    <div
                        className={ClassNames(cls.Links__group, {}, [opened ? cls[''] : cls.Links__display])}
                    >
                        <AppLink to="/login" className={cls.appLink}>
                            {t('Log in')}
                        </AppLink>
                        <AppLink to="/registration" className={cls.appLink}>
                            {t('Register')}
                        </AppLink>
                    </div>
                )}

        </div>
    );
};
