import express, {Application, Express} from "express";
import {Server} from 'socket.io';
import http from "http";
import 'dotenv/config'
import {AppConfig} from "./config/appConfig.js";
import {Routes} from "./routes/index.js";
import {Socket} from './socket/index.js';


class BackEndServer {
    app:Express;
    http:http.Server;
    socket:Server
    constructor() {
        this.app = express();
        this.http =  new http.Server(this.app)
        this.socket = new Server(this.http)
    }
    appConfig() {
        new AppConfig(this.app).includeConfig()
    }
    includeRoutes() {
        new Routes(this.app).appRoutes()
        new Socket(this.socket).socketEvents();
    }
    appExecute() {
        this.appConfig()
        this.includeRoutes()
        const port = process.env.PORT || 3000

        this.http.listen(port,()=> {
            console.log(`Server is Listening port - ${port}`)
        })
    }
}
const app = new BackEndServer()
app.appExecute()
