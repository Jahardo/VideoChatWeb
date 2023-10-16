import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClassNames } from 'shared/lib/ClassNames';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import cls from './Main.module.scss';

interface MainProps {
    className?: string
}

const Main = ({ className }:MainProps) => {
    const { t } = useTranslation('main');
    const navigate = useNavigate();
    const createRoom = () => {
        console.log(v4());
        navigate(`room/${v4()}`);
    };
    return (
        <div className={ClassNames(cls.Main, {}, [className])}>
            {t('main')}
            <Button
                theme={ThemeButton.SUBMIT}
                onClick={createRoom}
            >
                {t('Create Room')}
            </Button>
        </div>
    );
};

export default Main;
