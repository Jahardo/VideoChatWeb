import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ClassNames } from 'shared/lib/ClassNames';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { ClickingAnimation } from 'shared/ui/ClickingAnimation';
import cls from './Main.module.scss';

interface MainProps {
    className?: string
}

const Main = ({ className }:MainProps) => {
    const { t } = useTranslation('main');
    const navigate = useNavigate();
    const buttonRef = useRef<any>(null);
    const createRoom = () => {
        navigate(`room/${v4()}`);
    };
    return (
        <div className={ClassNames(cls.Main, {}, [className])}>
            <ClickingAnimation objRef={buttonRef}>
                <Button
                    theme={ThemeButton.SUBMIT}
                    onClick={createRoom}
                    className={cls.new_room_button}
                >
                    {t('Create Room')}
                </Button>
            </ClickingAnimation>
        </div>
    );
};

export default Main;
