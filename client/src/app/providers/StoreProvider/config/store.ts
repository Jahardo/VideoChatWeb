import { configureStore } from '@reduxjs/toolkit';
import { joinReducer } from 'entities/Join';
import { VideoSettingReducer } from 'entities/VideoSettings';
import { UserReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState ?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            join: joinReducer,
            videoSettings: VideoSettingReducer,
            user: UserReducer,
        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
