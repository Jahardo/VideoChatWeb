import { PreEnterVideoElement } from 'witgets/PreEnterVideoElement';
import { LoginForm } from 'witgets/LoginForm';
import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames';
import cls from './PreEnterMenu.module.scss';

interface PreEnterMenuProps {
    className?: string
}

export const PreEnterMenu = ({ className }:PreEnterMenuProps) => (
    <div className={ClassNames(cls.PreEnterMenu, {}, [cls.center, className])}>
        <PreEnterVideoElement />
        <LoginForm />
    </div>
);
