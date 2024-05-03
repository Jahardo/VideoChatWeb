import React, { ReactNode, RefObject, useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames';
import cls from './ClickingAnimation.module.scss';

interface ClickingAnimationProps {
    children?: ReactNode;
    className?:string
    objRef:RefObject<any>;
}
export const ClickingAnimation = ({ children, className, objRef }:ClickingAnimationProps) => {
    useEffect(() => {
        const tt = () => {
            objRef.current.classList.add(cls.effectContainer);
        };
        tt();
        const applyStyles = (e:MouseEvent) => {
            const { offsetX, offsetY } = e;
            const { style } = objRef.current;
            style.setProperty('--effect-duration', `${1.25}s`);
            style.setProperty('--effect-left', `${offsetX - (objRef.current.offsetWidth / 2)}px`);
            style.setProperty('--effect-top', `${offsetY - (objRef.current.offsetHeight / 2)}px`);
            style.setProperty('--effect-width', `${objRef.current.offsetWidth}px`);
            style.setProperty('--effect-height', `${objRef.current.offsetHeight}px`);
        };
        const buttonClick = (e:MouseEvent) => {
            objRef.current.classList.remove(cls.active);
            applyStyles(e);
            objRef.current.classList.add(cls.active);
        };
        objRef.current.addEventListener('mouseup', buttonClick);
    }, []);
    return (
        <div ref={objRef} className={ClassNames(cls.ClickingAnimation, {}, [className])}>
            {children}
        </div>
    );
};
