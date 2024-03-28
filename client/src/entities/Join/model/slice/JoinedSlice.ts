import { createSlice } from '@reduxjs/toolkit';
import { joinSchema } from '../types/joinSchema';

const initialState: joinSchema = {
    value: false,
};
export const joinSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        change: (state) => {
            state.value = !state.value;
        },
    },
});

export const { actions: joinAction } = joinSlice;
export const { reducer: joinReducer } = joinSlice;
