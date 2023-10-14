import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClassNames } from 'shared/lib/ClassNames';
import cls from './Main.module.scss';

interface MainProps {
    className?: string
}

const Main = ({ className }:MainProps) => {
    const { t } = useTranslation('main');
    return (
        <div className={ClassNames(cls.Main, {}, [className])}>
            {t('main')}
        </div>
    );
};

export default Main;
