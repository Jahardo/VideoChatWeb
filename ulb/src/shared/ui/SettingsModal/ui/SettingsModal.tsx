import { ClassNames } from 'shared/lib/ClassNames';
import { Modal } from 'shared/lib/Modal';
import { Dispatch, SetStateAction } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button';
import cls from './SettingsModal.module.scss';

interface SettingsModalProps {
    className?: string,
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
}

export const SettingsModal = ({ className, open, setOpen }:SettingsModalProps) => {
    const state = 'f';
    const hideModal = () => { setOpen(!open); };
    return (
        <Modal onClose={hideModal} className={ClassNames('', {}, [className])}>
            <div className={cls.SettingsModal}>
                content
            </div>
        </Modal>
    );
};
