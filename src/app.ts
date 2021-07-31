import express from "express";
import { Route } from "./core/interfaces";

export default class App
{
    public app : express.Application;
    public port: string | number;

    constructor(routes: Route[]){
        this.app = express();
        this.port = process.env.PORT || 9000;
        this.initlizeRoute(routes);
    }

    private initlizeRoute(routes: Route[])
    {
        routes.forEach(route => {
        this.app.use('/', route.router);
        });
    }

    public lister()
    {
        this.app.listen(this.port, () =>{
            console.log('host nodejs address at http://localhost:' + this.port);
        });
    }
   

}