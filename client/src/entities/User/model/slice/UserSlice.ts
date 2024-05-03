import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from 'features/http';
import { UserSchema } from '../types/UserSchema';

const initialState:UserSchema = {
    isAuth: false,
    _user: null,
};
export const UserSlice = createSlice({
    name: 'UserManager',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<UserData>) {
            state.isAuth = true;
            state._user = action.payload;
        },
        logoutUser(state) {
            state.isAuth = false;
            state._user = null;
        },
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
