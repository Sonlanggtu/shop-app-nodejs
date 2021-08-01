
import HttpException from './../exceptions/http.exception';
import { NextFunction, Response, Request } from 'express';
import Logger from './../utils/logger';


const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) =>{
    const status: number = error.status || 500;
    const message: string = error.message || 'Something when wrong';

    Logger.error(`[ERROR] - Status: ${status} - Message: ${message}`);
    res.status(status).json({message: message});
}


export default errorMiddleware;