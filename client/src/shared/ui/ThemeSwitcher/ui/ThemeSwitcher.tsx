import { ClassNames } from 'shared/lib/ClassNames';
import React from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import Dark from 'shared/assets/icons/Dark.svg';
import Light from 'shared/assets/icons/Light.svg';
import { Button, ThemeButton } from 'shared/ui/Button';
import { ToggleIcons } from 'shared/ui/ToggleIcons';

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = ({ className }:ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <ToggleIcons
            onClick={toggleTheme}
            className={ClassNames('', {}, [className])}
        >
            {theme === Theme.DARK
                ? <Dark />
                : <Light /> }
        </ToggleIcons>
    );
};
