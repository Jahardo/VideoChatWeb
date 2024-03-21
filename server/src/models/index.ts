import {Db} from "../config/db.js";
import {UserSchema} from './UserSchema.js'

export const UserModel = Db.model('User',UserSchema)