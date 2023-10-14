import { ClassNames } from 'shared/lib/ClassNames';
import { useState } from 'react';
import { CameraButton, MicrophoneButton } from 'shared/SpecialButtons';
import cls from './ButtonsPanel.module.scss';

interface ButtonsPanelProps {
    className?: string
}

export const ButtonsPanel = ({ className }:ButtonsPanelProps) => {
    const [state, setState] = useState();
    return (
        <div className={ClassNames(cls.ButtonsPanel, {}, [className])}>
            <div className={cls.content}>
                <CameraButton className={ClassNames(cls.btn, {}, [cls.btnScale])} />
                <MicrophoneButton className={ClassNames(cls.btn, {}, [cls.btnScale])} />
            </div>
        </div>
    );
};
