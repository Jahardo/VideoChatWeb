import react, {
    ChangeEvent, FormEvent, MouseEventHandler, SyntheticEvent, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ClassNames } from 'shared/lib/ClassNames';
import UserSvg from 'shared/assets/icons/UserSvg.svg';
import LockSvg from 'shared/assets/icons/LockSvg.svg';
import EyeSvg from 'shared/assets/icons/EyeSvg.svg';
import EyeOffSvg from 'shared/assets/icons/EyeOffSvg.svg';
import MailLine from 'shared/assets/icons/MailLine.svg';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useLocation, useParams } from 'react-router-dom';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import { login, registration } from 'features/http';
import { PasswordRequirements } from './PasswordRequirements';
import cls from './Auth.module.scss';
import { emailValidation } from './AuthValidation';

interface AuthProps {
    className?: string
}
const Auth = ({ className }:AuthProps) => {
    const location = useLocation();
    const isLogin = location.pathname === RouterPath.login;
    const { t } = useTranslation('auth');
    const [eye, setEye] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [Name, setName] = useState<string>('');
    const InputRef = useRef<any>(null);
    const PasRef = useRef<any>(null);
    const LoginBoxRef = useRef<any>(null);
    const [loginErrors, setLoginErrors] = useState([]);
    const changeEye = () => {
        setEye((prevState) => !prevState);
    };
    const authValidation = (email:string, password:string, isLogin:boolean, Name?:string) => {
        const dataErrors = [];
        if (!emailValidation(email)) {
            dataErrors.push('email is not valid');
        }
        if (!password) {
            dataErrors.push('password must not be empty');
        }
        if (!Name && !isLogin) {
            dataErrors.push('Name must not be empty');
        }
        return dataErrors;
    };
    const Authorize = async (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoginErrors([]);
        const errorsValidation = authValidation(email, password, isLogin, Name);
        if (errorsValidation.length !== 0) {
            setLoginErrors(errorsValidation);
        } else {
            try {
                let data:any;
                if (isLogin) {
                    data = await login({ email, password });
                    if (typeof data === 'string') {
                        setLoginErrors((prevState) => [...prevState, data]);
                    }else  {

                    }
                }
                if (!isLogin) {
                    data = await registration({ name: Name, email, password });
                    if (data) {
                        setLoginErrors((prevState) => [...prevState, data]);
                    }
                }
            } catch (e) {
                setLoginErrors((prevState) => [...prevState, e.message]);
            }
        }
    };
    const safePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        const select = InputRef.current.selectionStart;
        InputRef.current.classList.add(cls.inputFont);
        const maxOffset = InputRef.current.offsetWidth;
        const initialOffset = 20 + 12.8 - (PasRef.current.offsetWidth * 0.87);
        let offset = initialOffset + (15 * (select));
        offset = maxOffset - (PasRef.current.offsetWidth * 0.87) > offset
            ? offset
            : maxOffset - (PasRef.current.offsetWidth * 0.87);
        PasRef.current.style.setProperty('--left-position', `${offset}px`);
    };
    const imPrintEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const imName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    return (
        <div className={ClassNames(cls.login, {}, [className])}>
            {Object.values(loginErrors).map((error:string) => <div className={cls.error__form}>{error}</div>)}
            <form action="" className={cls.login__form}>
                <h1 className={cls.login__title}>{isLogin ? t('Login') : t('Registration')}</h1>

                {!isLogin
                    ? (
                        <div className={cls.login__content}>
                            <div className={cls.login__box}>
                                <UserSvg className={cls.login__icon} />
                                <div className={cls.login__boxInput}>
                                    <input
                                        type="text"
                                        required
                                        className={cls.login__input}
                                        placeholder=" "
                                        value={Name}
                                        onChange={imName}
                                    />
                                    <label htmlFor="login-email" className={cls.login__label}>
                                        {t('Name')}
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                    : <div />}

                <div className={cls.login__content}>
                    <div className={cls.login__box}>
                        <MailLine className={cls.login__icon} />
                        <div className={cls.login__boxInput}>
                            <input
                                type="email"
                                required
                                className={cls.login__input}
                                id="login-email"
                                placeholder=" "
                                value={email}
                                onChange={imPrintEmail}
                            />
                            <label htmlFor="login-email" className={cls.login__label}>
                                {t('Email')}
                            </label>
                        </div>
                    </div>

                    <div className={cls.login__box} ref={LoginBoxRef}>
                        <LockSvg className={cls.login__icon} />
                        <div className={cls.login__boxInput}>
                            <input
                                ref={InputRef}
                                type={eye ? 'text' : 'password'}
                                required
                                className={cls.login__input}
                                id="login-pass"
                                placeholder=" "
                                value={password}
                                onChange={safePassword}
                                max={124}
                            />
                            <label htmlFor="login-pass" className={cls.login__label}>{t('Password')}</label>
                            <PasswordRequirements objRef={PasRef} inputRef={InputRef} loginBoxRef={LoginBoxRef} />
                            {eye
                                ? <EyeSvg onClick={changeEye} className={cls.login__eye} />
                                : <EyeOffSvg onClick={changeEye} className={cls.login__eye} />}
                        </div>
                    </div>
                </div>

                <div className={cls.login__check}>
                    {/* <div className={cls.login__checkGroup}> */}
                    {/*    <input type="checkbox" className={cls.login__checkInput} id="login-check" /> */}
                    {/*    <label htmlFor="login-check" className={cls.login__checkLabel}>{t('Remember me')}</label> */}
                    {/* </div> */}
                    <div />

                    <AppLink to="/" className={cls.login__forgot}>{t('Forgot Password?')}</AppLink>
                </div>
                <button type="submit" onClick={Authorize} className={cls.login__button}>
                    {isLogin ? t('Login') : t('Register')}
                </button>
                <p className={cls.login__register}>
                    {isLogin ? t('Don\'t have an account?') : t('Already have an account?')}
                    {' '}
                    <AppLink to={isLogin ? '/registration' : '/login'}>{isLogin ? t('Register') : t('Login')}</AppLink>
                </p>
            </form>
        </div>
    );
};

export default Auth;
