import { ClassNames } from 'shared/lib/ClassNames';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string
    children?: ReactNode,
    onClose?:()=> void,
}

export const Modal = ({ children, className, onClose }:ModalProps) => createPortal(
    <div
        onClick={onClose}
        className={ClassNames(cls.Modal, {}, [className])}
    >
        <div
            onClick={(event) => event.stopPropagation()}
        >
            {children}
        </div>
    </div>,
    document.body,
);
