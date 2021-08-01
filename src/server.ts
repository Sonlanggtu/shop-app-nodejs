import App from './app';
import { IndexRoute } from './modules/index';
import "dotenv/config";
import {validateEnv, Logger} from './core/utils/index';


validateEnv();
const routes = [new IndexRoute()];
const app = new App(routes);

app.lister();