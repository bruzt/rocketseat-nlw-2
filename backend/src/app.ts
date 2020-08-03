import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {

    return res.sendStatus(200);
});

export { app };