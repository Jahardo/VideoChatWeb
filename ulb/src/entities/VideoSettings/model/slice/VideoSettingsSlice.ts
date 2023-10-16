import { createSlice } from '@reduxjs/toolkit';
import { VideoSettingsSchema } from '../types/VideoSettingsSchema';

const initialState:VideoSettingsSchema = {
    isMicro: true,
    isCamera: true,
};
export const VideoSettingsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        turnMicro: (state) => {
            state.isMicro = !state.isMicro;
        },
        turnCamera: (state) => {
            state.isCamera = !state.isCamera;
        },
    },
});

export const { actions: VideoSettingsActions } = VideoSettingsSlice;
export const { reducer: VideoSettingReducer } = VideoSettingsSlice;
