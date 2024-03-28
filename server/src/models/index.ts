import {Db} from "../config/db.js";
import {userSchema} from "./userSchema.js";

export const userModel = Db.model('Users',userSchema)