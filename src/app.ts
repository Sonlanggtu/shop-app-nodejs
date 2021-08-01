import express from "express";
import { Route } from "./core/interfaces";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import {Logger} from '../src/core/utils/index';
import errorMiddleware from './core/middlewares/error.middleware';
export default class App {
    public app: express.Application;
    public port: string | number;
    public env = process.env.NODE_ENV;
    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 9000;
        this.initlizeRoute(routes);
        this.connectMongoDB();
        this.initlizeMiddlewares();
    }

    private initlizeRoute(routes: Route[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initlizeMiddlewares() {
        if (this.env == "production") {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(cors({ origin: 'your.domain.com', credentials: true }))
        }
        else if (this.env == "development") {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }))
        }
        else if (this.env == "staging") {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }))
        }
        else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }))
        }

        this.app.use(errorMiddleware);
    }

    public lister() {
        this.app.listen(this.port, () => {
            Logger.info('host nodejs start address at http://localhost:' + this.port);
        });
    }

    public connectMongoDB() {
        try {
            const connectString = process.env.MONGODB_URI;
            if (connectString) {
                mongoose.connect(connectString, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                }).catch(reason => {
                    Logger.error(reason);
                    throw reason;
                });
                console.log('Database connected...');
            } else {
                console.log('Connection string is invalid');
                console.log("connection : " + connectString);
            }
        } catch (error) {
            console.log('Connect to database error');
            Logger.error(error.message);
            throw error;
        }
    }
}
