import { configureStore } from '@reduxjs/toolkit';
import { joinReducer } from 'entities/Join';
import { VideoSettingReducer } from 'entities/VideoSettings';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState ?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            join: joinReducer,
            videoSettings: VideoSettingReducer,
        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
