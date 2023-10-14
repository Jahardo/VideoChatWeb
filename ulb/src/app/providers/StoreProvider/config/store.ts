import { configureStore } from '@reduxjs/toolkit';
import { joinReducer } from 'entities/Join';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState ?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            join: joinReducer,
        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
