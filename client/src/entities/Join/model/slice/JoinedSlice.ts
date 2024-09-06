import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        set: (state, action:PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { actions: joinAction } = joinSlice;
export const { reducer: joinReducer } = joinSlice;
