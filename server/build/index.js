import express from "express";
import { Server } from 'socket.io';
import http from "http";
import 'dotenv/config';
import { AppConfig } from "./config/appConfig.js";
import { Routes } from "./routes/index.js";
class BackEndServer {
    app;
    http;
    socket;
    constructor() {
        this.app = express();
        this.http = new http.Server(this.app);
        this.socket = new Server(this.http);
    }
    appConfig() {
        new AppConfig(this.app).includeConfig();
    }
    includeRoutes() {
        new Routes(this.app).appRoutes();
    }
    appExecute() {
        this.appConfig();
        this.includeRoutes();
        const port = process.env.PORT || 3000;
        this.http.listen(port, () => {
            console.log(`Server is Listening port - ${port}`);
        });
    }
}
const app = new BackEndServer();
app.appExecute();
//# sourceMappingURL=index.js.map