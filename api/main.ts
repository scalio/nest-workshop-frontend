import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';

import { useRoutes } from './modules/routes';

const port = 3001;
const server = express();

server.use(morgan('tiny'));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

useRoutes(server);

server.listen(port, () => console.log('Mock API listen on port:', port));