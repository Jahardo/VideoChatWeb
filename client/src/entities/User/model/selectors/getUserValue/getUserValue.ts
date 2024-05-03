import { createSelector } from '@reduxjs/toolkit';
import { UserSchema } from 'entities/User';
import { getUser } from '../getUser/getUser';

export const getUserValue = createSelector(
    getUser,
    (user:UserSchema) => user._user,
);
