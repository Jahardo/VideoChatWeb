import { createSelector } from '@reduxjs/toolkit';
import { joinSchema } from 'entities/Join';
import { getJoin } from '../getJoin/getJoin';

export const getJoinValue = createSelector(
    getJoin,
    (join:joinSchema) => join.value,
);
