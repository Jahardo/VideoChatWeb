import { ClassNames } from 'shared/lib/ClassNames';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './NotFound.module.scss';

interface NotFoundProps {
    className?: string
}

const NotFound = ({ className }:NotFoundProps) => {
    const { t } = useTranslation('NotFoundPage');
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, []);
    return (
        <div className={ClassNames(cls.NotFound, {}, [])}>
            {/* {t('Error , Page not Found')} */}
        </div>
    );
};

export default NotFound;
