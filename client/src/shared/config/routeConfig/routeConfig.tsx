import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import React from 'react';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RoomPage } from 'pages/RoomPage';
import { AuthPage } from 'pages/AuthPage';
import { EditPage } from 'pages/EditPage';

export enum AppRoutes {
    MAIN='main',
    ABOUT = 'about',
    NOT_FOUND = 'not_found',
    ROOM = 'room',
    LOGIN = 'login',
    REGISTRATION = 'registration',
}
export enum AppRoutesAuth {
    MAIN='main',
    ABOUT = 'about',
    NOT_FOUND = 'not_found',
    ROOM = 'room',
    EDITPROFILLE = 'editprofille',
}

export const RouterPath:Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.ROOM]: '/room/:id',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTRATION]: '/registration',
    [AppRoutes.NOT_FOUND]: '*',
};
export const RouterPathAuth:Record<AppRoutesAuth, string> = {
    [AppRoutesAuth.MAIN]: '/',
    [AppRoutesAuth.ABOUT]: '/about',
    [AppRoutesAuth.ROOM]: '/room/:id',
    [AppRoutesAuth.EDITPROFILLE]: '/edit',
    [AppRoutesAuth.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RouterPath.main,
        element: <MainPage />,

    },
    [AppRoutes.ABOUT]: {
        path: RouterPath.about,
        element: <AboutPage />,

    },
    [AppRoutes.ROOM]: {
        path: RouterPath.room,
        element: <RoomPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RouterPath.login,
        element: <AuthPage />,
    },
    [AppRoutes.REGISTRATION]: {
        path: RouterPath.registration,
        element: <AuthPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RouterPath.not_found,
        element: <NotFoundPage />,
    },
};
export const routeConfigAuth: Record<AppRoutesAuth, RouteProps> = {
    [AppRoutesAuth.MAIN]: {
        path: RouterPathAuth.main,
        element: <MainPage />,

    },
    [AppRoutesAuth.ABOUT]: {
        path: RouterPathAuth.about,
        element: <AboutPage />,

    },
    [AppRoutesAuth.ROOM]: {
        path: RouterPathAuth.room,
        element: <RoomPage />,
    },
    [AppRoutesAuth.EDITPROFILLE]: {
        path: RouterPathAuth.editprofille,
        element: <EditPage />,
    },
    [AppRoutesAuth.NOT_FOUND]: {
        path: RouterPathAuth.not_found,
        element: <NotFoundPage />,
    },
};
