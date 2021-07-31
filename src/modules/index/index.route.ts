import Route from "../../core/interfaces/routes.interface";
import { Router } from 'express';
import IndexController from './index.controller';

export default class IndexRoute implements Route{
    public path = '/';
    public router = Router();

    public indexContrller = new IndexController();

    constructor(){
        this.initlizeRoutes();
    }

    private initlizeRoutes(){
        // With route path = '/' will call index() in indexController
        this.router.get(this.path, this.indexContrller.index);
    }
}