import express, {Application} from "express";
import fileUpload from "express-fileupload";
import path from "path";

export class ExpressConfig{
    constructor(app:Application) {
        //Files
        app.use('/static',express.static(path.resolve('static')))
        app.use(fileUpload({}))
    }
}