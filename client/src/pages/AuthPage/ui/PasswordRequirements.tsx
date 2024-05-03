import React, {
    ChangeEvent, RefObject, useEffect, useState,
} from 'react';
import CheckLine from 'shared/assets/icons/CheckLine.svg';
import CloseLine from 'shared/assets/icons/CloseLine.svg';
import { useTranslation } from 'react-i18next';
import { passwordSafeGradient, passwordSafeStyles } from 'pages/AuthPage/ui/AuthValidation';
import cls from './Auth.module.scss';

interface PasswordRequirementsProps {
    objRef?:RefObject<any>,
    inputRef?:RefObject<any>,
    loginBoxRef?:RefObject<any>
}
export const PasswordRequirements = ({ objRef, inputRef, loginBoxRef }:PasswordRequirementsProps) => {
    const { t } = useTranslation('Auth');
    const [oneCapital, setOneCapital] = useState<boolean>(false);
    const [oneNumber, setOneNumber] = useState<boolean>(false);
    const [enoughCharacters, setEnoughCharacters] = useState<boolean>(false);

    useEffect(() => {
        const scorePassword = (isChapters:boolean, isNumbers:boolean, isLength:boolean) => {
            if (!isLength) {
                return passwordSafeStyles[passwordSafeGradient.RED];
            }
            if (isLength && isChapters && isNumbers) {
                return passwordSafeStyles[passwordSafeGradient.GREEN];
            }
            return passwordSafeStyles[passwordSafeGradient.YELLOW];
        };
        const checkPasswordRequirements = (e:ChangeEvent<HTMLInputElement>) => {
            const pas = e.target.value;
            setOneCapital(/[A-Z]/.test(pas));
            setOneNumber(/\d/.test(pas));
            setEnoughCharacters(pas.length > 8);
            const score = scorePassword(/[A-Z]/.test(pas), /\d/.test(pas), pas.length > 8);
            // loginBoxRef.current.classList.add(score.input);
            loginBoxRef.current.style.setProperty('--border-bottom-color', score.borderColor);
        };
        const inputUnFocused = (e:ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === '') {
                loginBoxRef.current.style.setProperty('--border-bottom-color', passwordSafeStyles.default.borderColor);
            }
        };
        inputRef.current.addEventListener('blur', inputUnFocused);
        inputRef.current.addEventListener('input', checkPasswordRequirements);
    }, []);
    return (
        <div ref={objRef} className={cls.heptagon}>
            <div className={cls.heptagon__inner}>
                <div className={cls.heptagon__inner__contend}>
                    <div className={cls.heptagon__inner__contend__include_box}>
                        {enoughCharacters
                            ? <CheckLine className={cls.heptagon__icon} />
                            : <CloseLine className={cls.heptagon__icon} />}
                        <p className={cls.heptagon__text}>{t('8-64 Characters')}</p>
                    </div>
                    <div className={cls.heptagon__inner__contend__include_box}>
                        {oneCapital
                            ? <CheckLine className={cls.heptagon__icon} />
                            : <CloseLine className={cls.heptagon__icon} />}
                        <p className={cls.heptagon__text}>{t('At least one capital letter')}</p>
                    </div>
                    <div className={cls.heptagon__inner__contend__include_box}>
                        {oneNumber
                            ? <CheckLine className={cls.heptagon__icon} />
                            : <CloseLine className={cls.heptagon__icon} />}
                        <p className={cls.heptagon__text}>{t('At least one number')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
