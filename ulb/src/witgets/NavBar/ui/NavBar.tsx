import React, { useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from 'app/providers/ThemeProvider/lip/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button, ThemeButton } from 'shared/ui/Button';
import Setting from 'shared/assets/icons/Setting.svg';
import { SettingsModal } from 'shared/ui/SettingsModal';
import cls from './NavBar.module.scss';

interface NavBarProps {
    className?: string
}

export const NavBar = ({ className }: NavBarProps) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const SettingPressed = () => {
        setOpenModal((prevState) => !prevState);
    };
    return (
        <div className={ClassNames(cls.Navbar, {}, [className])}>
            <div className={cls.switcher}>
                <Button
                    onClick={SettingPressed}
                    className={cls.Setting}
                    theme={ThemeButton.CLEAR}
                >
                    <Setting />
                </Button>
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
            {openModal
                ? <SettingsModal setOpen={setOpenModal} open={openModal} />
                : <div />}
        </div>
    );
};
