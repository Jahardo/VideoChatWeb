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
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string
}
export const LoginForm = ({ className }:LoginFormProps) => {
    const { t } = useTranslation('main');
    const [name, setName] = useState<string>('');
    const [empty, setEmpty] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMicro = useSelector(getMicroValue);
    const isCamera = useSelector(getCameraValue);
    const roomId = useParams();
    const joinRoom = () => {
        if (name === '') {
            setEmpty(true);
            return;
        }
        setEmpty(false);
        dispatch(joinAction.change());
        socket.emit('pressJoin', {
            roomId: roomId.id,
            userName: name,
            isMicro,
            isCamera,
        });
    };

    return (
        <div className={ClassNames(cls.LoginForm, {}, [className])}>
            <h1>{t('Welcome to Video chat web')}</h1>
            <div className={cls.wrap}>
                <span>{t('Write here your Name')}</span>
                <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
                    theme={InputTheme.SMALL}
                    className={ClassNames('', { [cls.InputError]: empty }, [])}
                />
                <div className={cls.createOrJoin}>
                    <Button
                        onClick={joinRoom}
                        theme={ThemeButton.SUBMIT}
                        className={cls.btnAdditional}
                    >
                        {t('Join')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
