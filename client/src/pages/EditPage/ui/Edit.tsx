import { useTranslation } from 'react-i18next';
import { ClassNames } from 'shared/lib/ClassNames';
import { getUserValue, UserActions } from 'entities/User';
import { useDispatch, useSelector } from 'react-redux';
import UserSvg from 'shared/assets/icons/UserSvg.svg';
import MailLine from 'shared/assets/icons/MailLine.svg';
import { AvatarChange } from 'shared/ui/AvatarChange';
import { useRef, useState } from 'react';
import { Modal } from 'shared/lib/Modal';
import { FileUploader } from 'react-drag-drop-files';
import { changeImg, urlOfStaticFiles } from 'features/http';
import { Button, ThemeButton } from 'shared/ui/Button';
import { ClickingAnimation } from 'shared/ui/ClickingAnimation';
import { useLocation, useNavigate } from 'react-router-dom';
import cls from './Edit.module.scss';

interface EditProps {
    className?: string
}

const Edit = ({ className }:EditProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const buttonRef = useRef<any>(null);
    const user = useSelector(getUserValue);
    const fileTypes = ['JPG', 'PNG', 'JPEG'];
    const [file, setFile] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const handleFileChange = (file:File) => {
        setFile(file);
    };
    const openModal = () => {
        setIsModal(true);
    };
    const closeModal = () => {
        setIsModal(false);
    };
    const saveProfile = async () => {
        if (!file) {
            setIsModal(false);
        }
        await changeImg(file)
            .then((data:any) => {
                if (data) {
                    dispatch(UserActions.loginUser({
                        id: data.id, email: data.email, name: data.name, img: data.img,
                    }));
                } else {
                    dispatch(UserActions.logoutUser());
                }
            });
        setIsModal(false);
    };
    return (
        <div className={ClassNames(cls.login, {}, [className])}>
            {isModal
                ? (
                    <Modal onClose={closeModal}>
                        <div className={cls.upload__modal}>
                            <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} />
                            <ClickingAnimation objRef={buttonRef} className={cls.save__button_container}>
                                <Button
                                    theme={ThemeButton.SUBMIT}
                                    onClick={saveProfile}
                                    className={cls.save__button}
                                >
                                    {t('Save')}
                                </Button>
                            </ClickingAnimation>

                        </div>
                    </Modal>
                )
                : <div />}
            <form action="" className={cls.login__form}>
                <AvatarChange imgUrl={urlOfStaticFiles + user.img} showModal={openModal} />
                <div className={cls.login__content}>
                    <div className={cls.login__box}>
                        <UserSvg className={cls.login__icon} />
                        <div className={cls.login__boxInput}>
                            <input
                                type="text"
                                required
                                className={cls.login__input}
                                placeholder=" "
                                value={user.name}
                                onChange={() => {
                                }}
                            />
                            <label htmlFor="login-email" className={cls.login__label}>
                                {t('Name')}
                            </label>
                        </div>
                    </div>
                </div>
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
                                value={user.email}
                                onChange={() => {
                                }}
                            />
                            <label htmlFor="login-email" className={cls.login__label}>
                                {t('Email')}
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Edit;
