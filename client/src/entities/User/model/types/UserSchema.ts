import { UserData } from 'features/http';

export interface UserSchema {
    isAuth:boolean,
    _user?:UserData | null,
}
