import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig, routeConfigAuth } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAuthValue } from 'entities/User';

export const AppRouter = () => {
    const { t } = useTranslation();
    const isLogin = useSelector(getAuthValue);
    return (
        <Suspense fallback={<div>{t('...Loading')}</div>}>
            <Routes>
                {isLogin ? Object.values(routeConfigAuth).map(({ element, path }) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <div className="page-wrapper">
                                {element}
                            </div>
                        )}
                    />
                ))
                    : Object.values(routeConfig).map(({ element, path }) => (
                        <Route
                            key={path}
                            path={path}
                            element={(
                                <div className="page-wrapper">
                                    {element}
                                </div>
                            )}
                        />
                    ))}
            </Routes>
        </Suspense>
    );
};
