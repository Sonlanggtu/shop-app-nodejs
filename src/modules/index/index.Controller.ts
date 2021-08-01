import { Router } from "express";
import {NextFunction, Response, Request} from 'express';

export default class IndexController{
    public index = (req: Request, res: Response, next: NextFunction) =>{
        try {
            res.status(200).json('API is running .... ');
        } catch (error) {
            next(error);
        }
    } 
}