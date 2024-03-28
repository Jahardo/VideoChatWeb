import React, { useEffect, useRef, useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from 'app/providers/ThemeProvider/lip/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { ProfileMenu } from 'shared/ui/ProfileMenu';
import { use } from 'i18next';
import cls from './NavBar.module.scss';

interface NavBarProps {
    className?: string
}

export const NavBar = ({ className }: NavBarProps) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [opened, setOpened] = useState<boolean>(false);
    const menuRef = useRef(null);
    const handleToggle = () => {
        setOpened((prevState) => !prevState);
    };
    useEffect(() => {
        const handler = (e:Event) => {
            if (!menuRef.current.contains(e.target)) {
                setOpened(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);
    return (
        <div className={ClassNames(cls.Navbar, {}, [className])}>
            <ProfileMenu opened={opened} handleClick={handleToggle} profRef={menuRef} />
            <div className={cls.switcher}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
            <div className={cls.links}>
                <AppLink
                    theme={theme === Theme.LIGHT
                        ? AppLinkTheme.PRIMARY
                        : AppLinkTheme.SECONDARY}
                    to="/"
                    className={cls.mainLink}
                >
                    {t('Main')}
                </AppLink>
                <AppLink
                    theme={theme === Theme.LIGHT
                        ? AppLinkTheme.PRIMARY
                        : AppLinkTheme.SECONDARY}
                    to="/about"
                >
                    {t('about')}
                </AppLink>
            </div>
        </div>
    );
};
