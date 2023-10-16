import { ClassNames } from 'shared/lib/ClassNames';
import { Modal } from 'shared/lib/Modal';
import {
    Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import cls from './SettingsModal.module.scss';

interface SettingsModalProps {
    className?: string,
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
}

export const SettingsModal = ({ className, open, setOpen }:SettingsModalProps) => {
    /* const [devicesList, setDevicesList] = useState<any[]>();
    const getDevices = async () => {
        // List cameras and microphones.
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                devices.forEach((device) => {
                    const devi = {
                        kind: device.kind,
                        label: device.label,
                        id: device.deviceId,
                    };
                    console.log(devi);
                    setDevicesList([...devicesList, devi]);
                    // console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
                });
            });
    };
    useEffect(() => {
        if (open) {
            getDevices().then(() => {
                console.log(devicesList);
            });
        }
    }, [open]); */
    const hideModal = () => { setOpen(!open); };
    return (
        <Modal onClose={hideModal} className={ClassNames('', {}, [className])}>
            <div className={cls.SettingsModal} />
        </Modal>
    );
};
