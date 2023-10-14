import { createSelector } from '@reduxjs/toolkit';
import { getJoin } from '../getJoin/getJoin';
import { joinSchema } from '../../types/joinSchema';

export const getJoinValue = createSelector(
    getJoin,
    (join:joinSchema) => join.value,
);
