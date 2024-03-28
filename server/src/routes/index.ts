import {Application, Router} from 'express';
import {userRouter} from "./userRouter.js";


export class Routes{
    app:Application;
    router:Router;
    constructor(app:Application) {
        this.app = app
        this.router =Router();
        this.app.use('/api',this.router)
    }
    appRoutes(){
        this.router.use('/user',userRouter)
    }
}