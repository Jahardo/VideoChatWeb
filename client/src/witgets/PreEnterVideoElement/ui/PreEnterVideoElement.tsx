import { ClassNames } from 'shared/lib/ClassNames';
import { useState } from 'react';
import { LocalVideo } from 'shared/ui/Video';
import { CameraButton, MicrophoneButton } from 'shared/SpecialButtons';
import cls from './PreEnterVideoElement.module.scss';

interface PreEnterVideoElementProps {
    className?: string
}

export const PreEnterVideoElement = ({ className }:PreEnterVideoElementProps) => (
    <div className={ClassNames(cls.PreEnterVideoElement, {}, [className])}>
        <LocalVideo className={cls.Video} />
        <div className={cls.btnPositions}>
            <CameraButton />
            <MicrophoneButton />
        </div>
    </div>
);
