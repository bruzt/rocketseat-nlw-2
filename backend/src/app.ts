import dotenv from 'dotenv';

let env: string;
if(process.env.NODE_ENV === 'test') env = '.env.test';
else if(process.env.NODE_ENV === 'prod') env = '.env';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////////

import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN_URL }));
app.use(express.json());

app.use(routes);

export default app;