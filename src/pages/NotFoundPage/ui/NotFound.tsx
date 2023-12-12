import { ClassNames } from 'shared/lib/ClassNames';
import { useTranslation } from 'react-i18next';
import cls from './NotFound.module.scss';

interface NotFoundProps {
    className?: string
}

const NotFound = ({ className }:NotFoundProps) => {
    const { t } = useTranslation('NotFoundPage');
    return (
        <div className={ClassNames(cls.NotFound, {}, [])}>
            {t('Error , Page not Found')}
        </div>
    );
};

export default NotFound;
