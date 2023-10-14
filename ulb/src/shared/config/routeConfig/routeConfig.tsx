import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import React from 'react';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RoomPage } from 'pages/RoomPage';

export enum AppRoutes {
    MAIN='main',
    ABOUT = 'about',
    NOT_FOUND = 'not_found',
    ROOM = 'room'
}

export const RouterPath:Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.ROOM]: '/room/:id',
    [AppRoutes.NOT_FOUND]: '*',

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
    [AppRoutes.NOT_FOUND]: {
        path: RouterPath.not_found,
        element: <NotFoundPage />,

    },
    [AppRoutes.ROOM]: {
        path: RouterPath.room,
        element: <RoomPage />,
    },
};
