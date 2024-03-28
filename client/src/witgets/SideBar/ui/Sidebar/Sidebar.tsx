import React, { useState } from 'react';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import ArrowSmallLeft from 'shared/assets/icons/ArrowSmallLeft.svg';
import ArrowSmallRight from 'shared/assets/icons/ArrowSmallRight.svg';
import { Button, ThemeButton } from 'shared/ui/Button';
import { ClassNames } from 'shared/lib/ClassNames';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }:SidebarProps) => {
    const [collapsed, setCollapsed] = useState(true);
    // const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed((prevState) => !prevState);
    };
    return (
        <div className={ClassNames(cls.Sidebar, {
            [cls.collapsed]: collapsed,
        }, [className])}
        >
            <Button
                type="button"
                theme={ThemeButton.CLEAR}
                onClick={onToggle}
                className={ClassNames(cls.SideButton, {
                    [cls.ButtonCollapsed]: collapsed,
                }, [])}
            >
                {collapsed
                    ? <ArrowSmallRight />
                    : <ArrowSmallLeft />}
            </Button>
            <div className={ClassNames(
                cls.switchers,
                {
                    [cls.switchersCollapsed]: collapsed,
                },
                [],
            )}
            >
                <ThemeSwitcher />
                <LangSwitcher className={ClassNames(
                    '',
                    { [cls.lang]: !collapsed },
                    [],
                )}
                />
            </div>
        </div>
    );
};
