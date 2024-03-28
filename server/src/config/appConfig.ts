import express, {Application} from "express";
import cors from 'cors'
import {ExpressConfig} from "./ExpressConfig.js";



export class AppConfig{
    app:Application;
    constructor(app:Application) {
        this.app=app
    }
    includeConfig(){
        this.app.use(express.json())
        this.app.use(cors())
        new ExpressConfig(this.app)
    }
}