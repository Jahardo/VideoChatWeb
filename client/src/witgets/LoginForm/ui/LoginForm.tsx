import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { InputTheme } from 'shared/ui/Input/ui/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { ClassNames } from 'shared/lib/ClassNames';
import { useDispatch, useSelector } from 'react-redux';
import { getJoinValue, joinAction } from 'entities/Join';
import { socket } from 'shared/lib/socket';
import { useState } from 'react';
import { getCameraValue, getMicroValue } from 'entities/VideoSettings';
import { getAuthValue, getUser, getUserValue } from 'entities/User';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string
}
export const LoginForm = ({ className }:LoginFormProps) => {
    const { t } = useTranslation('main');
    const [name, setName] = useState<string>('');
    const [empty, setEmpty] = useState(false);
    const isLogin = useSelector(getAuthValue);
    const user = useSelector(getUserValue);
    const dispatch = useDispatch();
    const isMicro = useSelector(getMicroValue);
    const isCamera = useSelector(getCameraValue);
    const roomId = useParams();
    const joinRoom = () => {
        if (!isLogin && name === '') {
            setEmpty(true);
            return;
        }
        setEmpty(false);
        dispatch(joinAction.change());
        if (!isLogin) {
            socket.emit('pressJoin', {
                roomId: roomId.id,
                userName: name,
                img: 'default.jpg',
                isMicro,
                isCamera,
            });
        } else {
            socket.emit('pressJoin', {
                roomId: roomId.id,
                userName: user.name,
                img: user.img,
                isMicro,
                isCamera,
            });
        }
    };

    return (
        <div className={ClassNames(cls.LoginForm, {}, [className])}>
            <h1>{t('Welcome to Video chat web')}</h1>
            <div className={cls.wrap}>
                {isLogin
                    ? <div />
                    : (
                        <div>
                            <span>{t('Write here your Name')}</span>
                            <Input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                type="text"
                                placeholder="Name"
                                autoComplete="off"
                                theme={InputTheme.SMALL}
                                className={ClassNames(cls.loginform__input, { [cls.InputError]: empty }, [])}
                            />
                        </div>
                    )}
                <div className={cls.createOrJoin}>
                    <Button
                        onClick={joinRoom}
                        theme={ThemeButton.SUBMIT}
                        className={cls.btnAdditional}
                    >
                        {isLogin
                            ? t('Join')
                            : t('Join as guest')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
